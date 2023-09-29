#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <signal.h>

#define FLAGSIZE_MAX 64
#define INPUTBUFFER_MAX 16

char flag[FLAGSIZE_MAX];

void overflow_sig_handler(int sig)
{
  printf("%s\n", flag);
  exit(1);
}

int main(int argc, char **argv)
{
  char input_buffer[INPUTBUFFER_MAX];

  FILE *f = fopen("/root/flag.txt", "r");
  fgets(flag, FLAGSIZE_MAX, f);

  signal(SIGSEGV, overflow_sig_handler);
  printf("Input: ");
  gets(input_buffer);

  printf("The program will exit now\n");
  return 0;
}
