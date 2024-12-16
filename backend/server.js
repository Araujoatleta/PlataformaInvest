const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./fiis.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error('Erro ao conectar ao banco de dados:', err.message);
  else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run("PRAGMA busy_timeout = 10000");
  }
});

// Lista dos FIIs da B3 (adicione outros conforme necessário)
const fiiCodes = [
  'AAZQ11.SA', 'ABCP11.SA', 'AEFI11.SA', 'AFCR11.SA', 'AFHI11.SA',
  'AFOF11.SA', 'AGCX11.SA', 'AGRX11.SA', 'AIEC11.SA', 'AJFI11.SA',
  'ALMI11.SA', 'ALZC11.SA', 'ALZM11.SA', 'ALZR11.SA', 'ALZT11.SA',
  'ANCR11.SA', 'APTO11.SA', 'APXM11.SA', 'ARCT11.SA', 'AROA11.SA',
  'ARRI11.SA', 'ARXD11.SA', 'ASMT11.SA', 'ASRF11.SA', 'ATSA11.SA',
  'AURB11.SA', 'AZPL11.SA', 'BARI11.SA', 'BBFI11.SA', 'BBFO11.SA',
  'BBGO11.SA', 'BBIG11.SA', 'BBPO11.SA', 'BBRC11.SA', 'BBVJ11.SA',
  'BCFF11.SA', 'BCIA11.SA', 'BCRI11.SA', 'BICE11.SA', 'BICR11.SA',
  'BIME11.SA', 'BIPD11.SA', 'BLCA11.SA', 'BLCP11.SA', 'BLMC11.SA',
  'BLMG11.SA', 'BLMO11.SA', 'BLMR11.SA', 'BLOG11.SA', 'BLUR11.SA',
  'BMLC11.SA', 'BNFS11.SA', 'BPFF11.SA', 'BPML11.SA', 'BPRP11.SA',
  'BRCO11.SA', 'BRCR11.SA', 'BREV11.SA', 'BRIM11.SA', 'BRIP11.SA',
  'BRLA11.SA', 'BROF11.SA', 'BTAL11.SA', 'BTCI11.SA', 'BTCR11.SA',
  'BTHI11.SA', 'BTLG11.SA', 'BTML11.SA', 'BTRA11.SA', 'BTSG11.SA',
  'BTSI11.SA', 'BTWR11.SA', 'BTYU11.SA', 'BVAR11.SA', 'CACR11.SA',
  'CARE11.SA', 'CBOP11.SA', 'CCME11.SA', 'CCRF11.SA', 'CCVA11.SA',
  'CEOC11.SA', 'CFHI11.SA', 'CFII11.SA', 'CJCT11.SA', 'CLIN11.SA',
  'CNES11.SA', 'COPP11.SA', 'CORM11.SA', 'CPFF11.SA', 'CPLG11.SA',
  'CPOF11.SA', 'CPSH11.SA', 'CPTR11.SA', 'CPTS11.SA', 'CPUR11.SA',
  'CRAA11.SA', 'CRFF11.SA', 'CTXT11.SA', 'CVBI11.SA', 'CXAG11.SA',
  'CXCE11.SA', 'CXCI11.SA', 'CXCO11.SA', 'CXRI11.SA', 'CXTL11.SA',
  'DAMA11.SA', 'DAMT11.SA', 'DCRA11.SA', 'DEVA11.SA', 'DMAC11.SA',
  'DOMC11.SA', 'DOVL11.SA', 'DPRO11.SA', 'DRIT11.SA', 'DVFF11.SA',
  'EDFO11.SA', 'EDGA11.SA', 'EGAF11.SA', 'ELDO11B.SA', 'EQIN11.SA',
  'EQIR11.SA', 'ERCR11.SA', 'ERPA11.SA', 'EURO11.SA', 'EVBI11.SA',
  'EXES11.SA', 'FAED11.SA', 'FAMB11.SA', 'FATN11.SA', 'FCFL11.SA',
  'FEXC11.SA', 'FFCI11.SA', 'FGAA11.SA', 'FIGS11.SA', 'FIIB11.SA',
  'FIIP11.SA', 'FISC11.SA', 'FISD11.SA', 'FIXX11.SA', 'FLCR11.SA',
  'FLFL11.SA', 'FLMA11.SA', 'FLRP11.SA', 'FMOF11.SA', 'FPAB11.SA',
  'FPNG11.SA', 'FRBR11.SA', 'FTCE11.SA', 'FVBI11.SA', 'FVPQ11.SA',
  'FZDA11.SA', 'FZDB11.SA', 'GALG11.SA', 'GAME11.SA', 'GARE11.SA',
  'GCFF11.SA', 'GCOI11.SA', 'GCRA11.SA', 'GCRI11.SA', 'GESE11B.SA',
  'GGRC11.SA', 'GLOG11.SA', 'GRLV11.SA', 'GRWA11.SA', 'GSFI11.SA',
  'GTLG11.SA', 'GTWR11.SA', 'GURB11.SA', 'GWIR11.SA', 'GZIT11.SA',
  'HAAA11.SA', 'HABT11.SA', 'HBCR11.SA', 'HBRH11.SA', 'HBTT11.SA',
  'HCHG11.SA', 'HCRI11.SA', 'HCTR11.SA', 'HDEL11.SA', 'HFOF11.SA',
  'HGAG11.SA', 'HGBL11.SA', 'HGBS11.SA', 'HGCR11.SA', 'HGFF11.SA',
  'HGIC11.SA', 'HGJH11.SA', 'HGLG11.SA', 'HGPO11.SA', 'HGRE11.SA',
  'HGRU11.SA', 'HILG11.SA', 'HLOG11.SA', 'HMOC11.SA', 'HOFC11.SA',
  'HOSI11.SA', 'HPDP11.SA', 'HRDF11.SA', 'HREC11.SA', 'HRES11.SA',
  'HSAF11.SA', 'HSLG11.SA', 'HSML11.SA', 'HSRE11.SA', 'HTMX11.SA',
  'HUCG11.SA', 'HUSC11.SA', 'HUSI11.SA', 'IAAG11.SA', 'IAGR11.SA',
  'IBCR11.SA', 'IBFF11.SA', 'ICRI11.SA', 'IDFI11.SA', 'IDGR11.SA',
  'IFID11.SA', 'IFIE11.SA', 'INLG11.SA', 'INRD11.SA', 'IRDM11.SA',
  'IRIM11.SA', 'ISCJ11.SA', 'ITIP11.SA', 'ITIT11.SA', 'ITRI11.SA',
  'JASC11.SA', 'JBFO11.SA', 'JCCJ11.SA', 'JCIN11.SA', 'JFLL11.SA',
  'JGPX11.SA', 'JPPA11.SA', 'JPPC11.SA', 'JRDM11.SA', 'JSAF11.SA',
  'JSCR11.SA', 'JSRE11.SA', 'KCRE11.SA', 'KDOL11.SA', 'KEVE11.SA',
  'KFOF11.SA', 'KINP11.SA', 'KISU11.SA', 'KIVO11.SA', 'KNCA11.SA',
  'KNCR11.SA', 'KNHF11.SA', 'KNHY11.SA', 'KNIP11.SA', 'KNRE11.SA',
  'KNRI11.SA', 'KNSC11.SA', 'KNUQ11.SA', 'KOPA11.SA', 'KORE11.SA',
  'LASC11.SA', 'LATR11B.SA', 'LFTT11.SA', 'LGCP11.SA', 'LIFE11.SA',
  'LLAO11.SA', 'LOFT11B.SA', 'LPLP11.SA', 'LSAG11.SA', 'LSPA11.SA',
  'LTMT11.SA', 'LUGG11.SA', 'LVBI11.SA', 'MALL11.SA', 'MANA11.SA',
  'MATV11.SA', 'MAXR11.SA', 'MBRF11.SA', 'MCCI11.SA', 'MCEM11.SA',
  'MCHF11.SA', 'MCHY11.SA', 'MCRE11.SA', 'MFAI11.SA', 'MFCR11.SA',
  'MFII11.SA', 'MGCR11.SA', 'MGFF11.SA', 'MGHT11.SA', 'MGIM11.SA',
  'MGLG11.SA', 'MINT11.SA', 'MMPD11.SA', 'MORC11.SA', 'MORE11.SA',
  'MXRF11.SA', 'NAVT11.SA', 'NCHB11.SA', 'NCRA11.SA', 'NCRI11.SA',
  'NEWL11.SA', 'NEWU11.SA', 'NEXG11.SA', 'NPAR11.SA', 'NSLU11.SA',
  'NVHO11.SA', 'OBAL11.SA', 'OCRE11.SA', 'OGHY11.SA', 'OIAG11.SA',
  'ONEF11.SA', 'ORPD11.SA', 'OUCY11.SA', 'OUFF11.SA', 'OUJP11.SA',
  'OULG11.SA', 'OURE11.SA', 'PATA11.SA', 'PATC11.SA', 'PATL11.SA',
  'PDDA11B.SA', 'PEMA11.SA', 'PLCA11.SA', 'PLCR11.SA', 'PLOG11.SA',
  'PLRI11.SA', 'PMFO11.SA', 'PMIS11.SA', 'PNCR11.SA', 'PNDL11.SA',
  'PNPR11.SA', 'PNRC11.SA', 'PORD11.SA', 'PQAG11.SA', 'PQDP11.SA',
  'PRSN11.SA', 'PRSV11.SA', 'PULV11.SA', 'PURB11.SA', 'PVBI11.SA',
  'QAGR11.SA', 'QAMI11.SA', 'QIFF11.SA', 'QIRI11.SA', 'QMFF11.SA',
  'RBBV11.SA', 'RBCO11.SA', 'RBDS11.SA', 'RBED11.SA', 'RBFF11.SA',
  'RBGS11.SA', 'RBHG11.SA', 'RBHY11.SA', 'RBIR11.SA', 'RBIV11.SA',
  'RBLG11.SA', 'RBOP11.SA', 'RBRD11.SA', 'RBRF11.SA', 'RBRI11.SA',
  'RBRL11.SA', 'RBRM11.SA', 'RBRP11.SA', 'RBRR11.SA','RBRM11.SA',
  'RBRP11.SA', 'RBRR11.SA', 'RBRS11.SA', 'RBRX11.SA','RBRY11.SA', 
  'RBTS11.SA', 'RBVA11.SA', 'RBVO11.SA', 'RCFF11.SA','RCRB11.SA', 
  'RCRI11B.SA', 'RDES11.SA', 'RDPD11.SA', 'RECR11.SA','RECT11.SA',
  'RECX11.SA', 'REIT11.SA', 'RELG11.SA', 'RFOF11.SA','RINV11.SA',
  'RMAI11.SA', 'RNDP11.SA', 'RNGO11.SA', 'ROOF11.SA','RPRI11.SA', 
  'RRCI11.SA', 'RSPD11.SA', 'RURA11.SA', 'RVBI11.SA','RZAG11.SA',
  'RZAK11.SA', 'RZAT11.SA', 'RZDM11.SA', 'RZEO11.SA','RZTR11.SA', 
  'RZZR11.SA', 'SADI11.SA', 'SAIC11B.SA', 'SAPI11.SA','SARE11.SA',
  'SCPF11.SA', 'SDIL11.SA', 'SDIP11.SA', 'SEED11.SA','SEQR11.SA', 
  'SHDP11B.SA', 'SHOP11.SA', 'SHPH11.SA', 'SIGR11.SA','SJAU11.SA',
  'SMRE11.SA', 'SNAG11.SA', 'SNCI11.SA', 'SNCR11.SA','SNEL11.SA', 
  'SNFF11.SA', 'SNFZ11.SA', 'SNLG11.SA', 'SNME11.SA','SOLR11.SA',
  'SPDE11.SA', 'SPMO11.SA', 'SPTW11.SA', 'SPXS11.SA','SRVD11.SA', 
  'STRX11.SA', 'TBOF11.SA', 'TELM11.SA', 'TEPP11.SA','TGAR11.SA',
  'THRA11.SA', 'TJKB11.SA', 'TMPS11.SA', 'TORD11.SA','TOUR11.SA',
  'TRBL11.SA', 'TRNT11.SA', 'TRXB11.SA', 'TRXF11.SA','TRXL11.SA',
  'TSER11.SA', 'TSNC11.SA', 'TVRI11.SA', 'UBSR11.SA','URHF11.SA',
  'URPR11.SA', 'VCJR11.SA', 'VCRA11.SA', 'VCRI11.SA','VCRR11.SA',
  'VERE11.SA', 'VGHF11.SA', 'VGIA11.SA', 'VGII11.SA','VGIP11.SA',
  'VGIR11.SA', 'VGRI11.SA', 'VIFI11.SA', 'VILG11.SA','VINO11.SA',
  'VISC11.SA', 'VIUR11.SA', 'VJFD11.SA', 'VLOL11.SA','VOTS11.SA',
  'VPSI11.SA', 'VRTA11.SA', 'VRTM11.SA', 'VSEC11.SA','VSHO11.SA',
  'VSLH11.SA', 'VTLT11.SA', 'VTPL11.SA', 'VVCR11.SA','VVMR11.SA',
  'VVPR11.SA', 'VVRI11.SA', 'VXXV11.SA', 'WHGR11.SA','WPLZ11.SA',
  'WSEC11.SA', 'WTSP11.SA', 'XPCA11.SA', 'XPCI11.SA','XPCM11.SA',
  'XPHT11.SA', 'XPIN11.SA', 'XPLG11.SA', 'XPML11.SA','XPPR11.SA',
  'XPSF11.SA', 'XTED11.SA', 'YCHY11.SA', 'YUFI11.SA','ZAGH11.SA', 
  'ZAVC11.SA', 'ZAVI11.SA', 'ZIFI11.SA'
];

// Função para buscar dados de cada FII
async function fetchFiiData(symbol) {
  try {
    const data = await yahooFinance.quote(symbol);

    if (!data || !data.regularMarketPrice) {
      console.warn(`Dados ausentes para ${symbol}.`);
      return null;
    }

    return {
      nome: symbol.replace('.SA', ''), // Remove o sufixo '.SA'
      cotacao: data.regularMarketPrice || 0,
      dividendRate: data.trailingAnnualDividendRate || 0,
      dividendYield: ((data.trailingAnnualDividendRate || 0) / data.regularMarketPrice * 100).toFixed(2), // DY em %
      marketCap: data.marketCap || 0,
      pvp: data.bookValue ? (data.regularMarketPrice / data.bookValue).toFixed(2) : null, // P/VP calculado
      liquidez: data.averageDailyVolume10Day || 0
    };
  } catch (error) {
    console.error(`Erro ao buscar dados do FII ${symbol}:`, error.message);
    return null;
  }
}

// Rota para buscar e atualizar FIIs no banco
app.get('/api/fiis/fetch', async (req, res) => {
  try {
    db.serialize(async () => {
      db.run("DELETE FROM fiis", (err) => {
        if (err) console.error('Erro ao limpar a tabela de FIIs:', err.message);
      });

      console.log('Atualizando dados dos FIIs...');
      for (const fiiCode of fiiCodes) {
        const fiiData = await fetchFiiData(fiiCode);
        if (fiiData) {
          const query = `
            INSERT INTO fiis (nome, cotacao, dividendRate, dividendYield, marketCap, pvp, liquidez, favorito)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
          db.run(query, [
            fiiData.nome,
            fiiData.cotacao,
            fiiData.dividendRate,
            fiiData.dividendYield,
            fiiData.marketCap,
            fiiData.pvp,
            fiiData.liquidez,
            false // Inicialmente, o FII não está marcado como favorito
          ], (err) => {
            if (err) console.error(`Erro ao inserir ${fiiData.nome}:`, err.message);
            else console.log(`FII ${fiiData.nome} atualizado com sucesso.`);
          });
        }
      }
      console.log('Atualização concluída.');
      res.status(200).json({ message: 'FIIs atualizados com sucesso!' });
    });
  } catch (error) {
    console.error('Erro ao buscar e atualizar FIIs:', error.message);
    res.status(500).json({ message: 'Erro ao buscar e atualizar FIIs.' });
  }
});

// Rota para listar FIIs com filtros opcionais
app.get('/api/fiis', (req, res) => {
  const { nome, minDY, maxPVP } = req.query;

  let query = 'SELECT * FROM fiis WHERE 1=1'; // Base query

  const params = [];

  // Verificar se os filtros foram passados e adicionar os parâmetros na query
  if (nome) {
    query += ' AND nome LIKE ?';
    params.push(`%${nome}%`);
  }

  if (minDY) {
    query += ' AND dividendYield >= ?';
    params.push(minDY);
  }

  if (maxPVP) {
    query += ' AND pvp <= ?';
    params.push(maxPVP);
  }

  // Executar a query com parâmetros
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Erro ao listar FIIs:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar os FIIs' });
    }
    res.status(200).json(rows);
  });
});

// Rota para listar os FIIs favoritos
// Rota para adicionar ou remover favoritos
// Rota para listar os FIIs favoritos
app.get('/api/fiis/favoritos', (req, res) => {
  const query = `SELECT * FROM fiis WHERE favorito = 1`; // Busca todos os FIIs com favorito = 1

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Erro ao listar FIIs favoritos:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar os FIIs favoritos.' });
    }
    res.status(200).json(rows); // Retorna os FIIs favoritos
  });
});

// Rota para marcar ou desmarcar um FII como favorito
app.post('/api/fiis/favorito', (req, res) => {
  const { id, favorito } = req.body; // 'id' do FII e o status do 'favorito'

  const query = `
    UPDATE fiis
    SET favorito = ?
    WHERE id = ?
  `;

  db.run(query, [favorito, id], function (err) {
    if (err) {
      console.error('Erro ao atualizar o favorito:', err.message);
      return res.status(500).json({ message: 'Erro ao atualizar o favorito' });
    }
    res.status(200).json({ message: 'FII atualizado com sucesso' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});