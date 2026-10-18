@echo off
chcp 65001 >nul
title Publicar Enclave - Cloudflare Pages
cd /d "%~dp0"

echo ============================================================
echo   PUBLICADOR ENCLAVE ACCOMMODATION - CLOUDFLARE PAGES
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERRO] Node.js nao foi encontrado no sistema.
  echo Por favor, instale o Node.js em https://nodejs.org/ para continuar.
  echo.
  pause
  goto fim
)

:menu
echo Escolha o que deseja fazer:
echo.
echo   [1] Publicar Site Oficial Enclave (sites\enclave - HTML/CSS/JS)
echo   [2] Publicar App React / SPA (enclave-accommodation - Vite/Build)
echo   [3] Fazer Login na Cloudflare (Abre navegador uma unica vez)
echo   [4] Abrir o Painel Cloudflare Pages no Navegador
echo   [5] Sair
echo.
choice /C 12345 /N /M "Digite o numero da opcao (1, 2, 3, 4 ou 5): "

if errorlevel 5 goto fim
if errorlevel 4 goto abrir_painel
if errorlevel 3 goto login
if errorlevel 2 goto deploy_react
if errorlevel 1 goto deploy_static

:login
echo.
echo ============================================================
echo  [LOGIN] Autenticando com Cloudflare...
echo  (Uma janela do seu navegador sera aberta para autorizar)
echo ============================================================
call npx -y wrangler login
echo.
echo Login concluido! Voltando ao menu...
echo.
goto menu

:deploy_static
echo.
echo ============================================================
echo  [DEPLOY] Publicando sites\enclave no Cloudflare Pages...
echo ============================================================
echo.
call npx -y wrangler pages deploy "sites\enclave" --project-name enclave-accommodation
echo.
if errorlevel 1 (
  echo.
  echo [AVISO] Se o erro for de autenticacao, escolha a opcao [3] para fazer login.
) else (
  echo.
  echo ============================================================
  echo  [SUCESSO] Site Enclave publicado com sucesso!
  echo  Seu site ja esta protegido por SSL e CDN global Cloudflare.
  echo ============================================================
)
echo.
pause
goto fim

:deploy_react
echo.
echo ============================================================
echo  [BUILD ^& DEPLOY] Compilando e publicando React App...
echo ============================================================
echo.
cd /d "%~dp0enclave-accommodation"
echo 1/2. Gerando build de producao...
call npm run build
if errorlevel 1 (
  echo.
  echo [ERRO] Falha ao compilar o projeto React.
  cd /d "%~dp0"
  pause
  goto menu
)
echo.
echo 2/2. Enviando para Cloudflare Pages...
call npx -y wrangler pages deploy "dist" --project-name enclave-app
cd /d "%~dp0"
echo.
echo Concluido!
pause
goto fim

:abrir_painel
start https://dash.cloudflare.com/
goto menu

:fim
echo.
