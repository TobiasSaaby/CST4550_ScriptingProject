FROM debian:latest

RUN apt-get update && apt-get install -y python3 python3-pip openssh-server
RUN pip install pycrypto

RUN useradd -ms /bin/bash bob
RUN echo 'bob:bob' | chpasswd

WORKDIR /home/bob


COPY ./encrypt.py .
COPY ./justsometext .

RUN chown root ./encrypt.py
RUN python3 encrypt.py
RUN rm justsometext

RUN service ssh start
EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]