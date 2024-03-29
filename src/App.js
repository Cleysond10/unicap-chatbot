import { useState, useEffect } from 'react';

import { ChatBotWrapper } from './App.style';
import { useHistory } from 'react-router-dom'

// import {
//   useMutation,
//   gql
// } from "@apollo/client";

// const ADD_QUEST = gql`
//   mutation AddTodos($nome_aluno: String!, $mat_aluno: String!, $email_aluno: String!, $pergunta: String!) {
//   insert_perguntas_aluno(objects: {nome_aluno: $nome_aluno, mat_aluno: $mat_aluno, email_aluno: $email_aluno, pergunta: $pergunta}) {
//     returning {
//       mat_aluno
//       pergunta
//       nome_aluno
//     }
//   }
// }
// `;

function App() {

  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState(0);
  const [email, setEmail] = useState('');
const [message, setMessage] = useState('');

  // useEffect(() => {
  //   if(message != '') {
  //     addQuestionMutation({ variables: 
  //       { nome_aluno: nome, mat_aluno: matricula + "",
  //        email_aluno: email, pergunta: message } // Como matricula é um inteiro(NUMBER), precisei converter pra String com aspas vazias.
  //       });
  //     console.log(data);
  //   }
  // }, [message]);
  
  // const [addQuestionMutation, {data}] = useMutation(ADD_QUEST); 
 
  const history = useHistory();
  const goToCoord = () => {
    history.push('/dashboard'); 
  };

  const steps = [
    {
      id: '0',
      message: 'Bem-vindo ao ChatBot sobre estágio da Unicap!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Você é aluno ou coordenador ?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'a', label: 'Aluno', trigger: 'aluno-response' },
        { value: 'c', label: 'Coordenador', trigger: 'coord-response' },
      ]
    },
    {
      id: 'coord-response',
      message: 'Informe seu nome',
      trigger: 'input-name-coordenador',
    },
    {
      id: 'aluno-response',
      message: 'Informe seu nome:',
      trigger: 'input-name',
    },
    {
      id: 'input-name',
      user: true,
      validator: (value) => {
        if (/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(value)) {
          setNome(value);
          return true;
        }
        else {
          return 'Por favor, digite apenas letras.';
        }
      },
      trigger: 'matricula',
    },
    {
      id: 'matricula',
      message: 'Informe sua matrícula:',
      trigger: 'input-matricula',
    },
    {
      id: 'input-name-coordenador',
      user: true,
      validator: (value) => {
        if (/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(value)) {
          setNome(value);
          return true;
        }
        else {
          return 'Por favor, digite apenas letras.';
        }
      },
      trigger: 'matricula-coord',
    },
    {
      id: 'matricula',
      message: 'Informe sua matrícula:',
      trigger: 'input-matricula',
    },
    {
      id: 'matricula-coord',
      message: 'Informe seu ID de coordenador',
      trigger: 'input-matricula-coord',
    },
    {
      id: 'input-matricula',
      user: true,
      validator: (value) => {
        if (/^[0-9]*$/.test(value)) {
          setMatricula(value);
          return true;
        }
        else {
          return 'Por favor, digite apenas números.';
        }
      },
      trigger: 'email',
    },
    {
      id: 'input-matricula-coord',
      user: true,
      validator: (value) => {
        if (/^[0-9]*$/.test(value)) {
          setMatricula(value);
          return true;
        }
        else {
          return 'Por favor, digite apenas números.';
        }
      },
      trigger: 'pagina-coord',
    },
    {
      id: 'pagina-coord',
      message: 'Encaminhado para a página do coordenador',
      trigger: goToCoord, // AQUII CHAMADA DA ROTA !!
    },
    {
      id: 'email',
      message: 'Informe seu E-mail:',
      trigger: 'input-email',
    },
    {
      id: 'input-email',
      user: true,
      validator: (value) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setEmail(value);
          return true;
        }
        else {
          return 'Por favor, digite um e-mail válido.';
        }
      },
      trigger: 'perguntas_principais',
    },
    {
      id: 'perguntas_principais',
      message: 'Categorias principais de perguntas. Selecione uma opção abaixo:',
      trigger: 'perguntas_1',
    },
    {
      id: 'perguntas_1',
      options: [
        { value: 'a', label: 'Dúvidas gerais sobre estágio', trigger: 'dúvidas_gerais' },
        { value: 'b', label: 'Dúvidas sobre as partes envolvidas no estágio', trigger: 'dúvidas_partes' },   
        { value: 'c', label: 'Dúvidas sobre contrato de estágio', trigger: 'dúvidas_contrato' }, 
        { value: 'd', label: 'Dúvidas sobre as atividades desenvolvidas durante o estágio', trigger: 'dúvidas_atividades' }, 
        { value: 'e', label: 'Dúvidas sobre direito dos estagiários', trigger: 'dúvidas_direito' }, 
        { value: 'f', label: 'Dúvidas sobre o termo de compromisso de estágio', trigger: 'dúvidas_compromisso' },
      ]
    },

{
id: 'dúvidas_direito',
message: 'Selecione uma opção abaixo:',
trigger: 'perguntas_direito',
},
  
{
id: 'perguntas_direito',
options: [
 { value: 'a', label: 'Dúvidas específicas sobre Deveres.', trigger: 'chamada_deveres' },
 { value: 'b', label: 'Dúvidas específicas sobre Direitos.', trigger: 'chamada_direitos' },
]
},
  
{
id: 'chamada_deveres',
message: 'Selecione uma opção abaixo:',
trigger: 'perguntas_direito1',
},
  
{
id: 'perguntas_direito1',
options: [
 { value: 'a', label: 'Quais são as obrigações legais das instituições de ensino em relação aos seus estagiários?', trigger: 'resp_14' },
 { value: 'b', label: 'Quais são as principais obrigações da parte concedente na relação de estágio?', trigger: 'resp_15' },
]
},
  
{
id: 'chamada_direitos',
message: 'Selecione uma opção abaixo:',
trigger: 'perguntas_direito2',
},
  
{
id: 'perguntas_direito2',
options: [
 { value: 'a', label: 'O estagiário é segurado obrigatório do Regime Geral da Previdência Social?', trigger: 'resp_27' },
 { value: 'b', label: 'O estagiário tem direito a recesso?', trigger: 'resp_28' },
 { value: 'c', label: 'O recesso deve ser remunerado?', trigger: 'resp_29' },
 { value: 'd', label: 'Deve ser aplicada ao estagiário a legislação relacionada à saúde e à segurança no trabalho?', trigger: 'resp_30' },
 { value: 'e', label: 'O estagiário tem direito ao seguro contra acidentes pessoais? Qual a cobertura do seguro?', trigger: 'resp_31' },
 { value: 'f', label: 'Dúvidas específicas sobre Bolsas, Auxílios e Benefícios.', trigger: 'chamada_bolsas' },
]
},
  
{
id: 'chamada_bolsas',
message: 'Selecione uma opção abaixo:',
trigger: 'perguntas_direito2.1',
},
  
{
id: 'perguntas_direito2.1',
options: [
 { value: 'a', label: 'Quando o estágio deve ser obrigatoriamente remunerado (concessão de bolsa ou outra forma de contraprestação)?', trigger: 'resp_22' },
 { value: 'b', label: 'O que é o auxílio-transporte?', trigger: 'resp_23' },
 { value: 'c', label: 'Quando é obrigatória a concessão do auxílio-transporte ao estagiário?', trigger: 'resp_24' },
 { value: 'd', label: 'Podem, a critério da parte concedente, ser concedidos outros benefícios ao estagiário?', trigger: 'resp_25' },
 { value: 'e', label: 'As ausências do estagiário podem ser descontadas do valor da bolsa?', trigger: 'resp_26' },
]
},
  
//------------------------------------------------------------------------------------------------------
  
{
id: 'dúvidas_compromisso',
message: 'Selecione uma opção abaixo:',
trigger: 'perguntas_compromisso',
},
  
{
id: 'perguntas_compromisso',
options: [
 { value: 'a', label: 'A celebração de convênio de concessão de estágio entre a instituição de ensino e a parte concedente dispensa a celebração do termo de compromisso de estágio?', trigger: 'resp_16' },
 { value: 'b', label: 'O que é o termo de compromisso de estágio?', trigger: 'resp_32' },
 { value: 'c', label: 'O que deve constar no Termo de Compromisso?', trigger: 'resp_33' },
 { value: 'd', label: 'O plano de atividades do estagiário deve ser incorporado ao termo de compromisso de estágio?', trigger: 'resp_34' },
 { value: 'e', label: 'O agente de integração pode atuar como representante do estagiário, da parte concedente ou da instituição de ensino no Termo de Compromisso de Estágio?', trigger: 'resp_35' },
 { value: 'f', label: 'O Termo de Compromisso de Estágio pode ser rescindido antes do seu término?', trigger: 'resp_36' },
]
},
  
//------------------------------------------------------------------------------------------------------
  
{
id: 'resp_14',
message: 'são obrigações das instituições de ensino, em relação aos estágios de seus estudantes: a) celebrar termo de compromisso com o estudante ou com seu representante ou assistente legal, quando ele for absoluta ou relativamente incapaz e com a parte concedente, indicando as condições de adequação do estágio à proposta pedagógica do curso, à etapa e à modalidade da formação escolar do estudante e ao horário e calendário escolar; b) avaliar as instalações da parte concedente do estágio e sua adequação à formação cultural e profissional do estudante; c) indicar professor orientador da área a ser desenvolvida no estágio, como responsável pelo acompanhamento e avaliação das atividades do estagiário; d) exigir do estudante a apresentação periódica, em prazo não superior a seis meses, de relatório das atividades, do qual deverá constar visto do orientador da instituição de ensino e do supervisor da parte concedente; e) zelar pelo cumprimento do termo de compromisso, reorientando o estagiário para outro local em caso de descumprimento de suas normas; f) elaborar normas complementares e instrumentos de avaliação dos estágios de seus estudantes; g) comunicar à parte concedente do estágio, no início do período letivo, as datas de realização de avaliações escolares ou acadêmicas. (incisos I a VII do art. 7º)',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_15',
message: 'são obrigações da concedente de estágio: a) celebrar termo de compromisso com a instituição de ensino e com o estudante, zelando por seu cumprimento; b) ofertar instalações que tenham condições de proporcionar ao estudante atividades de aprendizagem social, profissional e cultural; c) indicar funcionário de seu quadro de pessoal, com formação ou experiência profissional na área de conhecimento desenvolvida no curso do estagiário, para orientar e supervisionar até 10 (dez) estagiários simultaneamente; d) contratar em favor do estagiário seguro contra acidentes pessoais, cuja apólice seja compatível com valores de mercado, conforme fique estabelecido no termo de compromisso, podendo, alternativamente, na hipótese de estágio obrigatório, ser assumida pela instituição de ensino; e) entregar termo de realização do estágio com indicação resumida das atividades desenvolvidas, dos períodos e da avaliação de desempenho por ocasião do desligamento do estagiário; f) manter à disposição da fiscalização documentos que comprovem a relação de estágio; g) enviar à instituição de ensino, com periodicidade mínima de 6 (seis) meses, relatório de atividades, com vista obrigatória ao estagiário; h) implementar a legislação relacionada à saúde e à segurança do trabalho a ser aplicada ao estagiário.(incisos I a VII e parágrafo único do art. 9º e art. 14).',
trigger: 'nova_pergunta',
},
  
  {
  id: 'resp_27',
  message: 'não. O estagiário, porém, pode inscrever-se e contribuir como segurado facultativo da Previdência Social (§ 2º do art. 12).',
  trigger: 'nova_pergunta',
  },
  
{
id: 'resp_28',
message: 'sim. É assegurado ao estagiário, sempre que o estágio tenha duração igual ou superior a 1 (um) ano, período de recesso de 30 (trinta) dias. Nos casos de o estágio ter duração inferior a 1 (um) ano, os dias de recesso serão concedidos de maneira proporcional. O recesso deve ser gozado, preferencialmente, durante as férias escolares (caput e § 2º do art. 13). O recesso poderá ser concedido em período contínuo ou fracionado, conforme estabelecido no termo de compromisso de estágio (Cartilha Esclarecedora sobre a Lei de Estágio/ MTE).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_29',
message: 'o recesso deve ser remunerado somente quando o estagiário receber bolsa ou outra forma da contraprestação (§1º do art.13).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_30',
message: 'sim. Devem ser tomados os cuidados necessários para a promoção da saúde e prevenção de doenças e acidentes, considerando, principalmente, os riscos decorrentes de fatores relacionados aos ambientes, condições e formas de organização do trabalho. Sua implementação é de responsabilidade da parte concedente do estágio. (art. 14º Lei 11.788/2008 e Cartilha Esclarecedora sobre a Lei de Estágio/MTE).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_31',
message: 'sim. O seguro deve abranger acidentes pessoais ocorridos com o estudante durante o período de vigência do estágio, 24 (vinte e quatro) horas/dia, no território nacional, assim como morte ou invalidez permanente, total ou parcial, provocada por acidente. O valor da indenização deve constar do Certificado Individual de Seguro de Acidentes Pessoais e deve ser compatível com os valores de mercado. (Cartilha Esclarecedora sobre a Lei de Estágio/ MTE).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_22',
message: 'no caso do estágio não obrigatório, é compulsória a concessão de bolsa ou outra forma de contraprestação que venha a ser acordada no termo de compromisso do estágio. Somente no caso de estágio obrigatório é que a concessão de bolsa ou outra forma de contraprestação é facultativa. (art. 12).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_23',
message: 'é uma concessão, feita pela instituição concedente, de recursos financeiros para auxiliar nas despesas de deslocamento do estagiário ao local de estágio e seu retorno. Esse auxílio financeiro pode ser substituído por transporte próprio da empresa. Deve constar do termo de compromisso de estágio (Cartilha Esclarecedora sobre a Lei de Estágio/MTE).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_24',
message: 'no caso do estágio não obrigatório, é compulsória a concessão de auxílio-transporte. No caso de estágio obrigatório, a concessão de auxílio transporte é facultativa (art. 12).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_25',
message: 'sim. A eventual concessão de benefícios relacionados a transporte, alimentação e saúde, entre outros, não caracteriza vínculo empregatício para todos os fins da legislação trabalhista e da previdenciária (§ 1º do art. 12).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_26',
message: 'sim. A remuneração das atividades de estágio, por meio de bolsa ou outra forma de contraprestação, pressupõe o cumprimento das atividades previstas no termo de compromisso de estágio. Ausências eventuais, devidamente justificadas, poderão ser objetos de entendimento entre as partes, e poderão, na forma acordada, deixar de ser descontadas. (Cartilha Esclarecedora sobre a Lei de Estágio/MTE).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_16',
message: 'não. A celebração de convênio de concessão de estágio entre a instituição de ensino e a parte concedente não dispensa a celebração do termo de compromisso de estágio (parágrafo único do art. 8º).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_32',
message: 'o termo de compromisso de estágio – TCE – é um acordo tripartite celebrado entre o estudante, a parte concedente do estágio e a instituição de ensino, prevendo as condições de adequação do estágio à proposta pedagógica do curso, à etapa e à modalidade da formação escolar do estudante e ao horário e calendário escolar. (Cartilha Esclarecedora sobre a Lei de Estágio/MTE).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_33',
message: 'devem constar, no Termo de Compromisso, todas as cláusulas que nortearão o termo de compromisso de estágio, tais como: a) dados de identificação das partes, inclusive cargo e função do supervisor do estágio da parte concedente e do orientador da instituição de ensino; b) as responsabilidades de cada uma das partes; c) objetivo do estágio; d) definição da área do estágio; e) plano de atividades do estágio com vigência; f) a jornada de atividades do estagiário; g) a definição do intervalo na jornada diária, se for o caso; h) vigência do termo de compromisso do estágio; i) período de concessão do recesso, que deve ocorrer na vigência do estágio, destacando sua concessão de forma contínua ou fracionada; j) valor da bolsa, ou outra forma de contra prestação; k) valor do auxílio-transporte, ou sua substituição por transporte próprio da empresa; l) outros benefícios a serem concedidos ao estagiário, quando for o caso; m) o número da apólice e a companhia de seguros; n) motivos de rescisão. (Cartilha Esclarecedora sobre a Lei de Estágio/ MTE).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_34',
message: 'sim. O plano de atividades do estagiário, elaborado de comum acordo entre o estudante, a parte concedente e a instituição de ensino, deve ser incorporado ao termo de compromisso de estágio. E, à medida que for avaliado, progressivamente, o desempenho do estudante, deve ser incorporado ao termo de compromisso por meio de aditivos (parágrafo único do art. 7º).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_35',
message: 'não. O termo de compromisso deve ser firmado pelo estagiário ou com seu representante ou assistente legal e pelos representantes legais da parte concedente e da instituição de ensino, vedada a atuação dos agentes de integração como representante de qualquer das partes (art. 16).',
trigger: 'nova_pergunta',
},
  
{
id: 'resp_36',
message: 'sim. O Termo de Compromisso de Estágio pode ser rescindido unilateralmente pelas partes e a qualquer momento. (Cartilha Esclarecedora sobre a Lei de Estágio/MTE).',
trigger: 'nova_pergunta',
},

    {
      id: 'dúvidas_gerais',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_gerais',
    },
    {
      id: 'perguntas_gerais',
      options: [
        { value: 'a', label: 'O que é o estágio?', trigger: 'resp_1' },
        { value: 'b', label: 'Quais são as modalidades de estágio?', trigger: 'resp_2' },
        { value: 'c', label: 'As atividades desenvolvidas pelo estudante de extensão, de monitorias e de iniciação científica na educação superior podem ser equiparadas ao estágio?', trigger: 'resp_5' },
      ]
    },
    {
      id: 'resp_1',
      message: 'Estágio é ato educativo escolar supervisionado, desenvolvido no ambiente de trabalho, que visa à preparação para o trabalho produtivo de estudantes. O estágio integra o itinerário formativo do estudante e faz parte do projeto pedagógico do curso (art. 1º).',
      trigger: 'satisfatorio',
    },
    {
      id: 'resp_2',
      message: 'Estágio obrigatório, que é aquele definido como tal no projeto do curso, cuja carga horária é requisito para aprovação e obtenção do diploma, e estágio não obrigatório, que é aquele desenvolvido como atividade opcional, acrescida à carga horária regular e obrigatória (§§ 1º e 2º do art. 2º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_5',
      message: 'sim, desde que previstas no projeto pedagógico do curso (§ 3º do art. 2º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'dúvidas_partes',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_partes',
    },

    {
      id: 'perguntas_partes',
      options: [
        { value: 'a', label: 'Quem pode ser estagiário?', trigger: 'resp_3' },
        { value: 'b', label: 'Quem pode contratar estagiário?', trigger: 'resp_4' },
        { value: 'c', label: 'Dúvidas específicas sobre agente de integração.', trigger: 'chamada_agente' },
        { value: 'd', label: 'Dúvidas específicas sobre limitações para a contratação de estagiários em relação ao quadro pessoal da entidade concedente.', trigger: 'chamada_contratacao' },
        { value: 'e', label: 'Dúvidas específicas sobre estagiários em situação especial (deficiente, gestante, estrangeiro).', trigger: 'chamada_especial' },
      ]
    },
    {
      id: 'resp_3',
      message: 'Estudantes que estejam frequentando o ensino regular em instituições de educação superior, de educação profissional, de ensino médio, da educação especial e dos anos finais de ensino fundamental, na modalidade profissional da educação de jovens e adultos (art. 1º)',
      trigger: 'nova_pergunta',
    },

    {
      id: 'resp_4',
      message: 'As pessoas jurídicas de direito privado e os órgãos da administração pública direta, autárquica e fundacional de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios e os profissionais liberais de nível superior, devidamente registrados em seus respectivos conselhos de fiscalização profissional (caput do art. 9º).',
      trigger: 'nova_pergunta',
    },

    {
      id: 'chamada_agente',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_agentes',
    },
    {
      id: 'perguntas_agentes',
      options: [
        { value: 'a', label: 'As instituições de ensino e as partes concedentes de estágio podem	utilizar-se dos serviços dos agentes de integração?', trigger: 'resp_10' },
        { value: 'b', label: 'Quais são as atribuições definidas na lei para os agentes de integração?', trigger: 'resp_11' },
        { value: 'c', label: 'Pode ser cobrado do estudante algum valor pelos serviços previstos na lei e prestados pelos agentes de integração?', trigger: 'resp_12' },
        { value: 'd', label: 'Os agentes de integração podem sofrer penalidades?', trigger: 'resp_13' },
      ]
    },
    {
      id: 'resp_10',
      message: 'Sim. As instituições de ensino e as partes concedentes de estágio podem, mediante condições acordadas em instrumento jurídico apropriado, recorrer aos serviços de agentes de integração públicos e privados. Em caso de contratação com recursos públicos, deverá ser observada a legislação de licitação, Lei no. 8.666/1993 (caput do art. 5º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_11',
      message: 'Cabe ao agente de integração, como auxiliar no processo de aperfeiçoamento do estágio: a) identificar as oportunidades de estágio; b) ajustar suas condições de realização; c) fazer o acompanhamento administrativo; d) encaminhar negociação de seguros contra acidentes pessoais; e e) cadastrar os estudantes. (incisos de I a V do § 1º, do art. 5º). Os agentes de integração podem, ainda, selecionar os locais de estágio e organizar o cadastro dos concedentes das oportunidades de estágio. (art. 6º)',
      trigger: 'nova_pergunta',
    },
    
    {
      id: 'resp_12',
      message: 'Não. É vedada a cobrança de qualquer valor aos estudantes, a título de remuneração pelos serviços dos agentes de integração, previstos na lei (§ 2º do art. 5º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_13',
      message: 'Sim. Os agentes de integração serão responsabilizados civilmente se indicarem estagiários: a) para atividades não compatíveis com a programação curricular do curso; e b) que estejam frequentando cursos em instituições de ensino para quais não há  previsão de estágio curricular. (§ 3º do art. 5º).',
      trigger: 'nova_pergunta',
    },

    {
      id: 'chamada_contratacao',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_contratacao',
    },

    {
      id: 'perguntas_contratacao',
      options: [
        { value: 'a', label: 'Existe limitação para a contratação de estagiários em relação ao quadro de pessoal das entidades concedentes?', trigger: 'resp_37' },
        { value: 'b', label: 'A limitação para a contratação de estagiários em relação ao quadro de pessoal de concedentes se aplica aos estágios de nível superior e de nível médio profissional?', trigger: 'resp_38' },
        { value: 'c', label: 'O que se entende por quadro de pessoal para efeitos da lei de estágio?', trigger: 'resp_39' },
      ]
    },

    {
      id: 'resp_37',
      message: 'Sim. Para os estágios de ensino médio, de educação especial e dos anos finais do ensino fundamental, na modalidade profissional da educação de jovens e adultos. Nesses casos, o número máximo de estagiários deverá atender às seguintes proporções, em relação ao quadro de pessoal de concedente: a) de 1 (um) a 5 (cinco) empregados: 1 (um) estagiário; b) de 6 (seis) a 10 (dez) empregados: até 2 (dois) estagiários; c) de 11 (onze) a 25 (vinte e cinco) empregados: até 5 (cinco) estagiários; e d) acima de 25 (vinte e cinco) empregados, até 20% (vinte por cento) de estagiários (inciso I a IV do art. 17). Quando esse cálculo resultar em fração, poderá ser arredondado para o número inteiro imediatamente superior (§ 3º do art. 17)',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_38',
      message: 'Não. Essa limitação não se aplica aos estágios de nível superior e de nível médio profissional.',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_39',
      message: 'Para efeitos desta lei, considera-se quadro de pessoal o conjunto de trabalhadores empregados existentes no estabelecimento do estágio. Caso a concedente conte com várias filiais ou estabelecimentos, os quantitativos devem ser aplicados a cada um deles (§§1º e 2º, do art. 17).',
      trigger: 'nova_pergunta',
    },

    {
      id: 'chamada_especial',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_especial',
    },

    {
      id: 'perguntas_especial',
      options: [
        { value: 'a', label: 'Qual o percentual de vagas asseguradas aos portadores de deficiência?', trigger: 'resp_40' },
        { value: 'b', label: 'A estudante gestante pode estagiar?', trigger: 'resp_41' },
        { value: 'c', label: 'O estudante estrangeiro pode estagiar?', trigger: 'resp_6' },
      ]
    },

    {
      id: 'resp_40',
      message: 'É assegurado às pessoas portadoras de deficiência o percentual de 10% (dez) por cento das vagas de estágio oferecidas pela parte concedente (§5º. do art. 17).',
      trigger: 'nova_pergunta',
    },

    {
      id: 'resp_41',
      message: 'Sim. Não há nenhum empecilho da estudante gestante estagiar. Como todo estágio, sujeita-se às regras da Lei 11.788/08.',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_6',
      message: 'Sim, desde que o estudante estrangeiro esteja regularmente matriculado em curso superior no país autorizado ou reconhecido e seja observado o prazo do visto temporário de estudante, na forma da legislação aplicável (art. 4º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'dúvidas_contrato',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_contrato',
    },
    {
      id: 'perguntas_contrato',
      options: [
        { value: 'a', label: 'O estágio cria vínculo empregatício?', trigger: 'resp_7' },
        { value: 'b', label: 'Quais são os principais requisitos legais que devem ser observados para a formação da relação de estágio?', trigger: 'resp_8' },
        { value: 'c', label: 'O estagiário precisa ter Carteira de Trabalho?', trigger: 'resp_42' },
        { value: 'd', label: 'Quais as providências e documentos necessários à comprovação da regularidade do estágio?', trigger: 'resp_43' },
        { value: 'e', label: 'O contrato de estágio firmado na vigência da lei anterior precisa ser alterado?', trigger: 'resp_46' },
        { value: 'f', label: 'Dúvidas específicas sobre o descumprimento do contrato.', trigger: 'desc_contr' },
      ]
    },
    {
      id: 'desc_contr',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_contrato_desc',
    },
    {
      id: 'perguntas_contrato_desc',
      options: [
        { value: 'a', label: 'Qual a consequência prevista para a parte concedente no descumprimento da Lei nº 11.788/2008?', trigger: 'resp_44' },
        { value: 'b', label: 'Quais as hipóteses em que a concedente poderá ficar impedida de receber estagiários?', trigger: 'resp_45' },
      ]
    },
    {
      id: 'resp_7',
      message: 'O estágio é regido por legislação própria e, desde que observados os requisitos legais e as obrigações contidas no termo de compromisso de estágio, não estabelece vínculo empregatício de qualquer natureza, para todos os fins da legislação trabalhista e previdenciária (caput e § 2º do art. 3º c/c art. 15).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_8',
      message: 'Para formação da relação de estágio, devem ser observados os seguintes requisitos: a) matrícula e frequência regular do estudante público-alvo da lei; b) celebração do termo de compromisso entre o estudante, a parte concedente do estágio e a instituição de ensino; e c) compatibilidade entre as atividades desenvolvidas no estágio e as previstas no termo de compromisso. (incisos, I, II, III do art. 3º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_42',
      message: 'Não há obrigatoriedade para a expedição e anotação do estágio na Carteira de Trabalho e Previdência Social, uma vez que estágio não é emprego, sendo definido em legislação própria',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_43',
      message: 'a) o termo de compromisso de estágio, devidamente assinado pela empresa concedente, pela instituição de ensino e pelo estudante; b) o certificado individual de seguro de acidentes pessoais; c) comprovação da regularidade da situação escolar do estudante; d) comprovante de pagamento da bolsa ou equivalente e do auxílio-transporte; e e) verificação da compatibilidade entre as atividades desenvolvidas no estágio e aquelas previstas no termo de compromisso. (Cartilha Esclarecedora sobre a Lei de Estágio / MTE).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_46',
      message: 'O contrato firmado na vigência da lei anterior permanecerá válido até o término da sua vigência. Todavia, sua eventual prorrogação ou renovação ocorrida a partir da data da vigência da nova lei, ou seja, a partir de 26 de setembro de 2008, deverá ser feita com observância das novas regras.',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_44',
      message: 'A manutenção de estagiários em desconformidade com esta lei caracteriza vínculo empregatício do educando com a parte concedente do estágio para todos os fins da legislação trabalhista e previdenciária. (caput do art. 15 da Lei nº 11.788/2008',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_45',
      message: 'Nas hipóteses em que a concedente reincidir no descumprimento da lei, ficará impedida de receber estagiários por 2 (dois) anos, contados da data da decisão definitiva do processo administrativo correspondente. Essa penalidade limita-se à filial ou agência em que for cometida a irregularidade (§§1º e 2º do art. 15).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'dúvidas_atividades',
      message: 'Selecione uma opção abaixo:',
      trigger: 'perguntas_atividades',
    },
    {
      id: 'perguntas_atividades',
      options: [
        { value: 'a', label: 'O estágio deve ter acompanhamento efetivo pelo professor orientador da instituição de ensino e pelo supervisor da parte concedente?', trigger: 'resp_9' },
        { value: 'b', label: 'Qual o prazo máximo de duração do estágio na mesma unidade concedente?', trigger: 'resp_21' },
        { value: 'c', label: 'Dúvidas específicas sobre a jornada de estágio', trigger: 'perguntas_atividades_jornada' },
      ]
    },
    {
      id: 'perguntas_atividades_jornada',
      options: [
        { value: 'a', label: 'Como deve ser definida a jornada de atividade do estagiário?', trigger: 'resp_17' },
        { value: 'b', label: 'Qual a duração máxima da jornada de atividade de estágio?', trigger: 'resp_18' },
        { value: 'c', label: 'Como deve ser feita a concessão dos descansos durante a jornada de estágio?', trigger: 'resp_19' },
        { value: 'd', label: 'A jornada de estágio deve ser reduzida nos períodos de avaliação escolar?', trigger: 'resp_20' },
      ]
    },
    {
      id: 'resp_9',
      message: 'Sim. O estágio como ato educativo escolar supervisionado deve ter acompanhamento efetivo pelo professor orientador da instituição de ensino e pelo supervisor da parte concedente, comprovado por vistos nos relatórios de atividades (em prazo não superior a seis meses) e por menção de aprovação final (§ 1º do art. 3º). O supervisor da parte concedente somente pode orientar e supervisionar até 10 (dez) estagiários simultaneamente (inciso III, do art. 9º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_21',
      message: 'A duração do estágio, na mesma unidade concedente, não poderá exceder 2 (dois) anos, exceto quando se tratar de estagiário portador de deficiência (art. 11).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_17',
      message: 'A jornada de atividade em estágio deve ser definida de comum acordo entre a instituição de ensino, a parte concedente e o estudante ou seu assistente ou representante legal, devendo constar do termo de compromisso de estágio, ser compatível com as atividades escolares e observação da duração máxima prevista na lei (caput do art. 10).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_18',
      message: 'A jornada de atividade em estágio não deve ultrapassar: a) 4 (quatro) horas diárias e 20 (vinte) horas semanais, no caso de estudantes de educação especial e dos anos finais do ensino fundamental, na modalidade de educação de jovens e adultos; b) 6 (seis) horas diárias e 30 (trinta) horas semanais, no caso de estudantes do ensino superior, da educação profissional de nível médio e do ensino médio regular; c) 40 (quarenta) horas semanais, no caso do estágio relativo a cursos que alternam teoria e prática, nos períodos em que não estão programadas aulas presenciais, desde que previsto no projeto pedagógico do curso e da instituição de ensino (incisos I, II e § 1º do art. 10).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_19',
      message: 'A concessão do descanso durante a jornada de estágio deve ser definida de comum acordo entre a instituição de ensino, a parte concedente e o estudante ou seu assistente ou representante legal, devendo constar do termo de compromisso de estágio. Recomenda-se a observância de período suficiente à preservação da saúde física e mental do estagiário e respeito aos padrões de horário de alimentação – lanche, almoço e jantar. O período de intervalo não é computado na jornada de estágio. (Cartilha Esclarecedora sobre a Lei de Estágio/MTE)',
      trigger: 'nova_pergunta',
    },
    {
      id: 'resp_20',
      message: 'Sim, caso a instituição de ensino adote verificações de aprendizagem periódicas ou finais nos períodos de avaliação, a carga horária do estágio será reduzida pelo menos à metade, segundo o estipulado no termo de compromisso de estágio. Nesse caso, a instituição de ensino deverá comunicar à parte concedente do estágio, no início do período letivo, as datas de realização de avaliações escolares ou acadêmicas (§ 2º do art. 10 e inciso VII do art. 7º).',
      trigger: 'nova_pergunta',
    },
    {
      id: 'satisfatorio',
      message: 'A sua dúvida foi sanada satisfatoriamente?',
      trigger: 'satisfatorio_resp',
    },
    {
      id: 'satisfatorio_resp',
      options: [
        { value: 'a', label: 'Sim', trigger: 'nova_pergunta' },
        { value: 'b', label: 'Não', trigger: 'chamada_perg_personalizada' },
      ]
    },
    {
      id: 'chamada_perg_personalizada',
      message: 'Deseja enviar a sua pergunta para o coordenador de estágio?',
      trigger: 'perg_personalizada',
    },
    {
      id: 'perg_personalizada',
      options: [
        { value: 'a', label: 'Sim', trigger: 'perg_pers' },
        { value: 'b', label: 'Não', trigger: 'nova_pergunta' },
      ]
    },
    {
      id: 'perg_pers',
      message: 'Escreva a pergunta personalizada que deseja enviar para o coordenador:',
      trigger: 'escrever_pergunta_personalizada',
    },
    {
      id: 'escrever_pergunta_personalizada',
      user: true,
      validator: (value) => {
        if (value != "") {
          setMessage(value);          
          
          return true;          
        }
        else {
          return 'Por favor, digite uma pergunta válida.';
        }
      },
      trigger: 'criacao_perg_pers',
    },
    {
      id: 'criacao_perg_pers',
      message: 'Sua pergunta já foi enviada ao coordenador, aguarde retorno.',
      trigger: 'nova_pergunta',
    },

    {
      id: 'nova_pergunta',
      message: 'Deseja tirar uma nova dúvida?.',
      trigger: 'resp_nova_pergunta',
    },
    {
      id: 'resp_nova_pergunta',
      options: [
        { value: 'a', label: 'Sim', trigger: 'perguntas_principais' },
        { value: 'b', label: 'Não', trigger: 'finalizacao' },
      ]
    },
    {
      id: 'finalizacao',
      message: 'Obrigado por utilizar o Chatbot sobre estágio da UNICAP!',
      end: true,
    },
  ];

  return (    
    <div>
      <ChatBotWrapper steps={steps} />
    </div>
  );
}

export default App;
