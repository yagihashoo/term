import sys

if len(sys.argv) == 1:
    print("input the file name")
    sys.exit()

file_path = sys.argv[1]
time_list = open(file_path).read()
time_list = time_list.split("\n")
while "" in time_list:
    time_list.remove("")

for i in range(0, len(time_list)):
    time_list[i] = int(time_list[i][:-2])

avg = sum(time_list) / len(time_list)
print(str(avg) + "ms")
