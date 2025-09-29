import dados from "../models/dados.js";

const {  bruxos, casas, varinhas, animais, pocoes  } = dados;

const getAllBruxos = (req, res) => {
  const { casa } = req.query;
  let resultado = bruxos;
  if (casa) {
    resultado = resultado.filter((b) =>
      b.casa.toLowerCase().includes(casa.toLowerCase())
    );
  }
  if (getAllBruxos) {
    res.status(200).json({
      total: resultado.length,
      data: resultado,
    });
  } else {
    res.status(500).json({
      status: 500,
      success: false,
      error: "INTERNAL_SERVER_ERROR"
    });
  }
};

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
        const casasNomes = ["Lufa-Lufa", "Corvinal", "Sonserina", "Grifinória"];

    let id = req.params.id;
    id = parseInt(id);
    const bruxoId = bruxos.find(b => b.id === id);

    if (!casa || !casasNomes.includes(casa)) {
        return res.status(400).json({
            success: false,
            status: 400,
            error: "VALIDATION_ERROR",
            message: `O campo de casa é obrigatório e deve ser uma das opções: ${casasNomes.join(", ")}!`,
        });
    };

    if (varinhas.length < 3) {
        return res.status(400).json({
            success: false,
            status: 400,
            error: "VALIDATION_ERROR",
            message: `O nome da varinha deve ter pelo menos 3 caracteres`,
        });
    };

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

const deleteBruxo = (req, res) => {
    const id = parseInt(req.params.id);

    // Verifica permissões
    const usuario = req.query.usuario;
    const isAdmin = req.query.admin === 'true' || usuario === 'Diretor';

    if (!isAdmin) {
        return res.status(403).json({
            status: 403,
            success: false,
            message: "Permissões insuficientes: apenas o Diretor pode expulsar alunos.",
            error: "ACAO_PROIBIDA",
            required_role: "DIRETOR"
        });
    }

    if (isNaN(id)) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "O ID fornecido não é válido.",
            error: "ID_INVALIDO"
        });
    }

    const bruxoParaRemover = bruxos.find(b => b.id === id);

    if (!bruxoParaRemover) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `Não foi possível expulsar: bruxo com ID ${id} não encontrado em Hogwarts.`,
            error: "BRUXO_NAO_ENCONTRADO"
        });
    }

    const bruxosFiltrados = bruxos.filter(bruxo => bruxo.id !== id);
    bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

    return res.status(200).json({
        status: 200,
        success: true,
        message: `Bruxo com ID ${id} foi expulso com sucesso.`
    });
};

const updateBruxo = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, casa, anoNascimento, varinha, mascote, patrono, especialidade, ativo } =
    req.body;

  if (isNaN(id)) {
    return res.status(400).json({
        status: 400,
        success: false,
        message: "Precisa ser um ID valido",
        error: "INVALID_ID"
    })
};

  
  const bruxoExiste = bruxos.find((p) => p.id === id);
  if (!bruxoExiste) {
    return res.status(404).json({
        status: 404,
        success: false,
        message: "Não foi possível atualizar: Mago não encontrado no registro mágico",
        error: "MAGO_NAO_ENCONTRADO"
    });
  }
  const bruxoAtualizado = bruxos.map((bruxo) =>
    bruxo.id === id
      ? {
          ...bruxo,
          ...(nome && { nome }),
          ...(casa && { casa }),
          ...(anoNascimento && { anoNascimento }),
          ...(varinha && { varinha }),
          ...(mascote && { mascote }),
          ...(patrono && { patrono }),
          ...(especialidade && { especialidade }),
          ...(ativo && { ativo }),
        }
      : bruxo
  );

  bruxos.splice(0, bruxos.length, ...bruxoAtualizado);
  const bruxoEditado = bruxos.find((p) => p.id === id);

  return res.status(200).json({
    success: true,
    message: `bruxo editado com sucesso!`,
    bruxo: bruxoEditado,
  });
}

export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxo };