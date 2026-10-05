FROM node:22-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código do frontend
COPY . .

EXPOSE 5173

# Rodar Vite em modo host para permitir conexões externas e do host Windows
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
