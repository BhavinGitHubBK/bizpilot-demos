Select-String -Path index.html -Pattern 'class="hero"|id="lookbook"|lookbook-row legal|lookbook-row zivara|lookbook-row freshbasket|advocate-demo/index.html|jewellery-demo/index.html|kirana-demo/index.html' | ForEach-Object { $_.Line.Trim() }

