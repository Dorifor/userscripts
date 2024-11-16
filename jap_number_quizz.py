from random import *

liste = []
liste2 = []

def num_to_kanji(num):
    switch = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "七",
        8: "八",
        9: "九"
        }
    return switch.get(num, "error")

def check_num(x):
    if liste[x] != 0:
        liste2.append(num_to_kanji(liste[x]))

    if diff > (x + 1):
        if liste[x + 1] != 0:
            liste2.append("十")
            if liste[x + 1] != 1:
                liste2.append(num_to_kanji(liste[x + 1]))

    if diff > (x + 2):
        if liste[x + 2] != 0:
            liste2.append("百")
            if liste[x + 2] != 1:
                liste2.append(num_to_kanji(liste[x + 2]))

    if diff > (x + 3):
        if liste[x + 3] != 0:
            liste2.append("千")
            if liste[x + 3] != 1:
                liste2.append(num_to_kanji(liste[x + 3]))

def check_counter(x, kanji):
    if len(liste) > (x + 3):
        if not (liste[x] == 0 and liste[x + 1] == 0 and liste[x + 2] == 0 and liste[x + 3] == 0):
            kan = True

    else:
        for i in range(len(liste) - 4):
            if liste[4 + i] != 0:
                kan = True
            else:
                kan = False

    if kan:
        liste2.append(kanji)
        check_num(x)

def list_to_str(l):
    string = ""
    for i in range(len(l)):
        string += str(l[i])
    return string

def rem_zeros(l):
    while l[-1] == 0:
        l.pop(-1)
    return l

def add_esp(l):
    new_l = l.copy()
    k = 0
    for i in range(1, (len(l))):
        if i % 3 == 0:
            new_l.insert(i+k, " ")
            k += 1
    return new_l

def add_esp_kanji(l):
    new_l = l.copy()
    k = 0
    for i in range(1, (len(l))):
        if l[i] in ["万", "億", "兆"]:
            new_l.insert(i+k, "   ")
            k += 1
    return new_l

def difficulty():
    n = 0
    while n < 1 or n > 16:
        n = int(input("diff (1 - 16) : "))
    return n

series = 0
diff = 0
same = ""

print("Let's improve our japanese number translation !")
series = int(input("How much do you want to do ? : "))
print("Let's set difficulty : ")
diff = difficulty()
        
print(diff)

mode = randrange(100)

if mode > 50:
    nb = False
    kan = True
else:
    kan = False
    nb = True

for i in range(diff):
    liste.append(randint(0, 9))

check_num(0)

if diff > 4:
    check_counter(4, "万")

if diff > 8:
    check_counter(8, "億")

if diff > 12:
    check_counter(12, "兆")

nb = rem_zeros(add_esp(liste))
kan = add_esp_kanji(liste2)
nb.reverse()
kan.reverse()

liste.reverse()
liste2.reverse()

answer = list_to_str(liste)
kanji = list_to_str(liste2)
print(answer)
print(kanji)

# print(list_to_str(nb))
# print(list_to_str(kan))
