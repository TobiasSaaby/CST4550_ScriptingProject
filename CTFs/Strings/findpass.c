#include <stdio.h>  
#include <string.h>  
int main()  
{  
    char str1[50];
    char password[] = "CTF{FindPassWithStrings}";
   
    printf("Enter the Password: ");  
    scanf("%s",str1);  
    printf("\n");  
   
    if(strcmp(str1,password) == 0){
        printf("Password is correct!\n");  
        return 1;
    }

    printf("Password is wrong...\n");  
    return 0;  
}  