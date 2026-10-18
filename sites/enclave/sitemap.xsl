<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="pt">
      <head>
        <title>Sitemap XML | Enclave Accommodation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" type="image/png" href="assets/favicon.png"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #111816;
            background: #FBFBF8;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: #FFFFFF;
            border: 1px solid #E5E1D5;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 10px 30px rgba(5, 28, 20, 0.06);
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #0E4331;
            padding-bottom: 20px;
            margin-bottom: 24px;
            flex-wrap: wrap;
            gap: 16px;
          }
          h1 {
            color: #051C14;
            font-size: 24px;
            margin: 0 0 6px 0;
            font-weight: 700;
          }
          p.desc {
            color: #5F6F68;
            font-size: 14px;
            margin: 0;
          }
          .badge {
            background: #E8F4EF;
            color: #0E4331;
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            border: 1px solid rgba(14, 67, 49, 0.2);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13.5px;
            margin-top: 10px;
          }
          th {
            background: #051C14;
            color: #FFFFFF;
            text-align: left;
            padding: 12px 14px;
            font-weight: 600;
            letter-spacing: 0.03em;
          }
          th:first-child { border-top-left-radius: 8px; }
          th:last-child { border-top-right-radius: 8px; }
          td {
            padding: 14px;
            border-bottom: 1px solid #ECEEEB;
            vertical-align: middle;
          }
          tr:hover td {
            background: #F8FAF9;
          }
          a {
            color: #0E4331;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          a:hover {
            color: #D4AF37;
            text-decoration: underline;
          }
          .priority-pill {
            background: #FAF4E4;
            color: #664E0C;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11.5px;
            font-weight: 700;
            display: inline-block;
          }
          .footer {
            margin-top: 24px;
            font-size: 12px;
            color: #8C9E96;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1>Sitemap XML Oficial · Enclave Accommodation</h1>
              <p class="desc">Mapa de navegação indexado para motores de busca (Google, Bing) e visitantes.</p>
            </div>
            <div class="badge">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs Indexadas
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Página / URL</th>
                <th style="width: 120px;">Prioridade</th>
                <th style="width: 140px;">Atualização</th>
                <th style="width: 130px;">Frequência</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="priority-pill">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td style="text-transform: capitalize;">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <div class="footer">
            Enclave Accommodation · Refúgios Exclusivos em Moçambique e Zimbabwe
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
