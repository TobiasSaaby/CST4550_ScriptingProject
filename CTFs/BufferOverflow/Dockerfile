FROM debian:latest

ARG FLAG

## COPY ./01-disable-aslr.conf /etc/sysctl.d/
RUN apt-get update && apt-get install -y build-essential gdb python2 gcc-multilib openssh-server

RUN useradd -ms /bin/bash bob
RUN echo 'bob:bob' | chpasswd
RUN echo ${FLAG} > /root/flag.txt

WORKDIR /home/bob


COPY ./vuln.c .

## RUN gcc -g -o vuln vuln.c -m32 -mpreferred-stack-boundary=2 -z execstack -fno-stack-protector 
RUN gcc -o vuln vuln.c
RUN chown root ./vuln
RUN chmod u+s ./vuln

RUN service ssh start
EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]
