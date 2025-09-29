import dados from "../models/dados.js";

const { bruxos } = dados;

const getAllBruxos = (req,res) => {
    let resultado = bruxos;

    res.status(200).json({
        total: resultado.length,
        bruxos: resultado
    });
}

const getBruxosById = (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    const bruxoId = bruxos.find(b => b.id === id);
    if (bruxoId){
        res.status(200).json({
            total: bruxoId.length,
            bruxo: bruxoId
    })
    } else {
        res.status(404).json({
            status: 404,
            success: false,
            message: "Bruxo não encontrado no registro de Hogwarts",
            error: "BRUXO_NAO_ENCONTRADO",
            suggestions: [
                "Verifique a ortografia do nome do bruxo",
                "Confirme se o bruxo está registrado"
            ]
        });
    }
}

const createBruxo = (req, res) => {
    const { nome, casa, anoNascimento, especialidade, nivelMagia, ativo } = req.body;   

    if (!nome || !casa || !anoNascimento) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Parametros invalidos",
            error: "ERRO_VALIDACAO",
            details: {
            nome: "O nome do bruxo deve ser especificado",
            casa: "A casa do bruxo deve ser especificado",
            anoNascimento: "A ano de nascimento do bruxo deve ser especificado"
            }
        })
    }

    if (bruxos.some(b => b.nome === nome)) {
        return res.status(400).json({
            status: 409,
            success: false,
            message: "Bruxo já matriculado em Hogwarts",
            error: "BRUXO_DUPLICADO",
            existingId: id
});

    }

    const novoId = bruxos.length + 1;

    const novoBruxo = {
        id: novoId,
        nome,
        casa,
        anoNascimento: parseInt(anoNascimento),
        especialidade: especialidade || "Em desenvolvimento",
        nivelMagia: nivelMagia || "Iniciante",
        ativo: ativo !== undefined ? ativo : true
    };

    bruxos.push(novoBruxo);

    res.status(201).json({
        success: true,
        message: "Bruxo cadastrado com sucesso em Hogwarts!",
        bruxo: novoBruxo
    });
};

const deleteBruxo = (req,res) => {
    const id = parseInt(req.params.id);

    //por permissão

    const usuario = req.query.usuario || req.body.usuario; 
    const isAdmin = req.query.admin === 'true' || usuario === 'Diretor';

    if (!isAdmin) {
    return res.status(403).json({
      status: 403,
      success: false,
      message: "Permissões insuficientes: Apenas o Diretor pode expulsar alunos",
      error: "ACAO_PROIBIDA",
      required_role: "DIRETOR"
    });
}

    if (isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O ID deve ser válido"
        })
    }

    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if(!bruxoParaRemover) {
        return res.status(404).json({
            status: 404,
            sucesso: false,
            mensagem: `Não é possível expulsar: Feiticeiro ${id} não encontrado em Hogwarts`,
            erro: "FEITICEIRO_NÃO_ENCONTRADO"
}
)
    }

    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);

    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

     res.status(200).json({
            success: true,
            message: `Bruxo com o id: ${id} foi apagado com sucesso`
        })
}



const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { tipo, endereco, area, quartos, preco, disponivel, proprietario } = req.body;

    const tiposDeImoveis = ["Apartamento", "Casa de Condomínio", "Terreno", "Kitnet", "Chácara", "Sala Comercial", "Loft", "Casa de Vila", "Apartamento Duplex", "Galpão Industrial", "Apartamento na Praia", "Casa Térrea", "Studio", "Fazenda", "Apartamento Garden", "Sobrado", "Terreno Comercial", "Apartamento 1 por andar", "Casa de Campo", "Flat/Aparthotel", "Prédio Comercial", "Ponto Comercial (Loja)", "Cobertura Penthouse", "Sítio", "Apartamento Compacto"];
     
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    };

    const imovelExiste = imoveis.find(i => i.id === id);

    if (!imovelExiste) {
        return res.status(404).json({
            success: false,
            message: "Imóvel não existe"
        });
    };

    if (area < 0) {
        return res.status(400).json({
            success: false,
            message: "Área deve ser um número maior que 0 metros quadrados"
        })
    } 

    if (preco < 0) {
        return res.status(400).json({
            success: false,
            message: "Preço deve ser um número maior que 0"
        })
    }

    if (tipo) {
        if (!tiposDeImoveis.includes(tipo)) {
            return res.status(400).json({
                success: false,
                message: `O tipo "${tipo}" não é válido. Tipos permitidos: ${tiposDeImoveis.join(", ")}.`
            });
        };
    };


    const imoveisAtializados = imoveis.map(imovel =>
        imovel.id === id
            ? {
                ...imovel,
                ...(tipo && { tipo }),
                ...(endereco && { endereco }),
                ...(area && { area }),
                ...(quartos && { quartos }),
                ...(preco && { preco }),
                ...(disponivel && { disponivel }),
                ...(proprietario && { proprietario })
            }
            : imovel
    );

    imoveis.splice(0, imoveis.length, ...imoveisAtializados);

    const imovelAtualizado = imoveis.find(i => i.id === id);

    res.status(200).json({
        success: true,
        message: "imovel atualizado com sucesso",
        imovel: imovelAtualizado
    });

};

export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo };