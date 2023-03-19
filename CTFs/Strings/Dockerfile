FROM debian:latest


RUN apt-get update && apt-get install -y build-essential gdb gcc-multilib openssh-server

RUN useradd -ms /bin/bash bob
RUN echo 'bob:bob' | chpasswd

WORKDIR /home/bob

COPY ./findpass.c .

RUN gcc -o findpass findpass.c

RUN service ssh start
EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]
