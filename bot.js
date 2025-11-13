import { chromium } from "playwright";

async function loginIdGoias() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // 1. Ir para a URL inicial de autenticação
  await page.goto(
    "https://sso.acesso.go.gov.br/authenticationendpoint/login.do?client_id=fR2PV7xGIHlGnSKd6E_ttdOkWBEa&commonAuthCallerPath=%2Foauth2%2Fauthorize&forceAuth=false&passiveAuth=false&redirect_uri=https%3A%2F%2Fsso.go.gov.br%2Fcommonauth&response_type=code&scope=openid+email+profile+phone+id_goias+refresh_token&state=d050cb29-3ae8-4235-87b3-f516d7ebda7b%2COIDC&tenantDomain=carbon.super&sessionDataKey=defcbe40-4039-49a6-b0ea-43bcff4e9164&relyingParty=fR2PV7xGIHlGnSKd6E_ttdOkWBEa&type=oidc&sp=wso2is-prod&isSaaSApp=false&authenticators=GOV.BR%3Agov.br.selos%3BBasicAuthenticator%3ALOCAL",
    
  );

  // 2. Preencher CPF
  await page.fill("#usernameUserInput", "626.099.273-47");

  // 3. Preencher senha
  await page.fill("#password", "B@cktrack5r3");

  // 4. Clicar no botão Entrar
  await page.click("button[type=submit]");

  // 5. Aguardar redirecionamento OAuth2 com código
  await page.waitForURL(/code=/);

  const finalUrl = page.url();

  console.log("Redirect final:", finalUrl);

  // Capturar o código
  const code = new URL(finalUrl).searchParams.get("code");

  console.log("Código OAuth2:", code);

  await browser.close();

  return code;
}

loginIdGoias();
