import sys
import time
import json
import rpy2.robjects.packages as rpackages

rpackages.quiet_require('FSelectorRcpp')
#rpackages.quiet_require('FSelector')
# For now, it is not available because of the rJava importing problem
# and this makes oneR an unvailable method while rJava is not not fixed


args = sys.argv[1]
input_data = json.loads(args)

experiments = input_data[0]
results_path = input_data[1]



