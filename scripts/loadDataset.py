import sys
import time

data = sys.argv[1]

for i in range(1,4):
	print("loading..", i)
	print(data)
	sys.stdout.flush()
	time.sleep(2.3)


