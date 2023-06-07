# 2023-03-wns-keller-groupe1

### Installation et usage

1. Cloner le repo
```sh
git clone https://github.com/WildCodeSchool/2023-03-wns-keller-groupe1.git && cd 2023-03-wns-keller-groupe1
```
2. Installer les dépendances du front et du back

```sh
cd front npm install
cd back npm install
```
3. Copier puis renommer vars.env.example en vars.env

4. Lancer docker composer à la racine
```sh
docker compose -f docker-compose.yml up --build
```

5. Vous pouvez acceder à votre application sur les ports spécifiés
```sh
front http://localhost:3000/
back http://localhost:4000/
adminer http://localhost:8080/
```
