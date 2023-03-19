import random

from datetime import datetime
from Crypto.Cipher import AES

random.seed(datetime.today().date().day)

key = random.randbytes(16)
iv = random.randbytes(16)

crypt = AES.new(key, AES.MODE_CFB, iv)

fmessage = open("justsometext", "r")
message = fmessage.read()
fmessage.close()

en = crypt.encrypt(message)

fenc = open("encrypted", "wb")
fenc.write(en)
fenc.close()