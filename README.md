# Preparação para Provas 2026
Simulado ENEM em HTML/CSS/JS puro. Uma única prova: a cada acesso as questões e alternativas são sorteadas/embaralhadas a partir do banco.
## Publicar no GitHub Pages
1. Envie os arquivos para um repositório (index.html na raiz).
2. Settings → Pages → Branch main / root → Save.
## Adicionar questões
Edite `data/banco.js` e cole novas linhas na área certa (lin, hum, nat, mat):
`q("mat","Enunciado",["A","B","C","D","E"],2,EST,"Comentário"),`
O sorteio usa até 45 questões por área; com menos, usa todas.
