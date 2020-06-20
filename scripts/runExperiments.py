import sys
import time
import json
import rpy2.robjects.packages as rpackages

#rpackages.importr('FSelectorRcpp')
#rpackages.quiet_require('FSelector')
rpackages.importr('rJava')


sys.stdout.flush()

args = sys.argv[1]
input_data = json.loads(args)

experiments = input_data[0]
results_path = input_data[1]

print("11111", experiments)
sys.stdout.flush()



for i in range(1,4):
	print("deleting..", i)
	sys.stdout.flush()
	time.sleep(2.3)
