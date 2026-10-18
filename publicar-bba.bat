@echo off
chcp 65001 >nul
title Publicar BBA - Firebase Hosting
cd /d "%~dp0sites\bba"

where firebase >nul 2>nul
if errorlevel 1 (
  echo.
  echo [ERRO] Firebase CLI nao encontrada.
  echo.
  echo Instale uma vez so com:
  echo     npm i -g firebase-tools
  echo (precisa do Node.js instalado)
  goto fim
)

echo [1/3] Firebase login...
echo (se ja estiver logado, fecha rapido)
call firebase login

if not exist .firebaserc (
  echo.
  echo [2/3] PRIMEIRA VEZ: escolha, na lista, o projeto Firebase que JA TEM
  echo       o dominio bba.edu.mz ligado. De um alias simples, tipo: bba
  echo.
  call firebase use --add
)

echo.
echo ============================================
echo  Escolha como quer publicar:
echo.
echo   [1] Publicar AGORA no ar (bba.edu.mz)
echo   [2] Publicar canal de TESTE (preview - nao afeta o site atual)
echo   [3] Sair sem publicar
echo ============================================
choice /C 123 /N /M "Digite 1, 2 ou 3: "
if errorlevel 3 goto fim
if errorlevel 2 goto teste

echo.
echo [3/3] Publicando site novo no ar...
call firebase deploy --only hosting
echo.
echo Pronto! O CRM (formulario ^> planilha/Excel), o dominio e o DNS
echo NAO foram alterados - o deploy so trocou os arquivos visuais.
echo.
echo Se qualquer coisa parecer errada, voltou a versao anterior em 1 clique:
echo   Console Firebase ^> Hosting ^> Rollback
goto fim

:teste
echo.
echo [3/3] Publicando canal de teste...
call firebase hosting:channel:deploy v2-preview --expires 30d
echo.
echo TESTE NESTA URL antes de publicar de verdade:
echo   - menu, troca PT/EN, galeria, celular
echo   - E o mais importante: enviar 1 formulario de teste e conferir
echo     no CRM/Excel se a linha apareceu (data, nome, nivel, telefone)
goto fim

:fim
echo.
pause
