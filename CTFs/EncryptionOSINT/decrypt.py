import os
import random
import base64
from Crypto.Cipher import AES

random.seed(2)

key = random.randbytes(16)
iv = random.randbytes(16)

crypt = AES.new(key, AES.MODE_CFB, iv)

fmessage = open("encrypted", "rb")
message = fmessage.read()
fmessage.close()

print(fmessage)

de = crypt.decrypt(message)

fde = open("decrypted", "wb")
fde.write(de)
fde.close()
