# Използвай официалното Node.js изображение
FROM node:14

# Създай работен директория
WORKDIR /app

# Копирай package.json и package-lock.json
COPY package*.json ./

# Инсталирай зависимостите
RUN npm install

# Копирай всички файлове на проекта
COPY . .

# Задай порта, който ще бъде използван
EXPOSE 5001

# Дефинирай командата за стартиране на приложението
CMD ["npm", "start"]

