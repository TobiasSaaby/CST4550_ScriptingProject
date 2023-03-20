FROM debian:latest


RUN apt update && apt-get install -y wget lsb-release gnupg

WORKDIR /home/app


COPY . .
RUN wget http://repo.mysql.com/mysql-apt-config_0.8.24-1_all.deb
RUN apt install ./mysql-apt-config_0.8.24-1_all.deb
RUN apt update && apt install -y php-mysqli php-cli default-mysql-server

RUN chmod +x init_db.sh
RUN chmod +x start.sh
RUN ./init_db.sh
RUN service mariadb start
EXPOSE 8000

CMD [ "./start.sh" ]