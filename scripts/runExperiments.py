import sys
import time

from engine import DataManager

print(DataManager)

print("11111", sys.argv[1])
sys.stdout.flush()

print("2222", sys.argv[2])
sys.stdout.flush()


for i in range(1,4):
	print("deleting..", i)
	sys.stdout.flush()
	time.sleep(2.3)


