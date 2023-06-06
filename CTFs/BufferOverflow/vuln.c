#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>

#define FLAGSIZE_MAX 64
#define INPUTBUFFER_MAX 16

char flag[FLAGSIZE_MAX];

void sigsegv_handler(int sig) {
  printf("%s\n", flag);
  fflush(stdout);
  exit(1);
}

void vuln(char *input){
  char buf2[INPUTBUFFER_MAX];
  strcpy(buf2, input);
}

int main(int argc, char **argv){
  
  FILE *f = fopen("/root/flag.txt","r");
  
  fgets(flag,FLAGSIZE_MAX,f);
  signal(SIGSEGV, sigsegv_handler);
  
  gid_t gid = getegid();
  setresgid(gid, gid, gid);

  printf("Input: ");
  fflush(stdout);
  char buf1[INPUTBUFFER_MAX];
  gets(buf1); 
  vuln(buf1);
  printf("The program will exit now\n");
  return 0;
}