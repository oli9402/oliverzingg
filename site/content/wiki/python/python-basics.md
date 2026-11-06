---
title: "Python basics"
order: 1
---

## Pycharm

Use `# %% Test`to create executable blocks

## Namespace

-   *built-in*: all objects provided by python
-   *global*: programmer defined objects across whole script
-   *local*: programmer defined objects in function blocks

Object name must only be unique **within a given namespace**:

```python
def my_function(x):
  return x+10

def test_function(x):
  def my_function(y):  # my_function: this is possible since different namespace
    return y + 20
  x = my_function(2)
  return x

test_function()(y=10)
```

Inside a function you can access a global object via the keyword `global`. You can also increase a global var inside a function for example. But this should be avoided global access.

The keyword `nonlocal` will access a variable in the next higher namespace.

## Scope

Scope of an object refers to the code section from which an object is accessible.

## Indexing

Last index is not included:

```python
a = [1,2,3,4,5]

# Full list
a[:5]

a[-1:] #equal to a[-1:5]

a[-1:1:-1] #2 is index 2 but not included

#full list in reverse
a[-1::-1]   #equal to a[::-1]
a[:-2] #-2 is index of 4 but not included

a[:-2:-1]

# Print last string of language
L = ["Mojo", "is", "a", "language"]
print(L[3][-1:])

# Print up to last string in last element
L = ["Mojo", "is", "a", "language"]
print(L[3][:-1])
```

2D Lists return first line

```python
data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
[row[0] for row in data]
```

Modify index

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
numbers[1:4] = [10, 20, 30]
```

For loops

```python
numbers = [12, 32, 34, 4,25, 6, 72, 8, 19] #9 elements

len(numbers) #returns 9
print('')

i = range(6) #returns 0-5
for idx in i:
  print(idx, end= ' ')

print('\n')
i = range(len(numbers)) #0-8 -> 9 elements
for idx in i:
  print(idx, end= ' ')

print('\n')
i = range(1,len(numbers)) #1-8 -> 8 elements
for idx in i:
  print(idx, end= ' ')
```

Enumerate returns index and value

```python
numbers = [12, 32, 34, 4,25, 6, 72, 8, 19] #9 elements

for i in enumerate(numbers):
  print(i, end = ', ')
  print(i[0], end = ', ')
  print(i[1])

print('----')
# we can also save both values individuel
for idx, value in enumerate(numbers):
  print(idx , value)
```

Using `range(start, stop, step)` in for loop we can reverse the steps with -1.

```python
for i in range(5,0,-1):
  print(i)
```

## Functions

Functions can only return one reference to a storage location. So returning multiple references must be saved in a list:

```python
def function(a,b):
  return list(a,b)
```

Learning material for python functions (e.g., str.split()): [here](https://github.com/TheAlgorithms/Python/blob/master/strings/split.py)

### Function chaining:

```python
function_1(function_2(a)) = function_2(a).function_1()
```

### Function Arguments

```python
a,b,c = 3,4,5

a,b,c = 3,4,5,6 ## Error

a,b,*c = 3,4,5,6 # Works: assign all remaining var to c
```

`*` packs elements into a list. Use `*` again to unpack:

```python
print(a,b,*c)
```

This can be done in function parameter aswell:

```python
dic = {'a':1, 'b':3}
def my_f(a,b):
    return a+b

my_f(**dic) #Returns  4
```

`**` unpacks a dictionary. can only be used as parameter input?

Using `*args` in as parameter must be then accessed with a for loop, since it is provided to the function as tupple.

```python
# print first n letters of words

def strcut(*str, n):
    for i in str:
        print(i[:n])
# or

def strcut(*str,n):
    print('\n'.join(i[:n] for i in str))
```

### Else after Function

Else is executed after the for loop is over (more specific after the StopIteration is raised by the iterator) but if we use break (the loop doesn’t come to and end: else is not executed.) The else keyword in try-except works similar but if try reaches it’s end.

If for example we search a list for a flag item we can use else for the case that the flag item is not in the list.

```python
mylist = [1,2,3,4]
theflag = 5

def process(i):
    return i + 0.5

for i in mylist:
    if i == theflag:
        break
    process(i)
else:
    raise ValueError("List argument missing terminal flag.")
```

### Recursion

Simple recursion of factorial()

```python
def fac(n):
  if n == 1:
    return 1
  else:
    return n * fac(n-1)
```

### String split function

```python
def split(string, delimiter):

  result_list = []

  start = 0
  for index, char in enumerate(string):
      if char == delimiter:
          result_list.append(string[start:index])
          start = index + 1
  if start == 0:
      return [string]
  result_list.append(string[start:index + 1])

  return result_list
```

### String join function

takes an iterable (list, tuple) and concatenates its elements into a single string. The seperator is provided as string from which join is called

```python
l = ['1','2','3']
print('#'.join(l))
```

```output
1#2#3
```

If int in list:

```python
l = [1,2,3]
print('#'.join(map(str,l)))
```

```output
1#2#3
```

### \*args and \*\*kwargs

They allow you to write functions that can accept an arbitrary number of arguments, making your code more flexible.

\*args collects arguments into a tuple:

```python
def print_numbers(*args):
    for number in args:
        print(number)

print_numbers(1, 2, 3, 4)
```

\*\*kwargs collects arguments into a dictionary

```python
def print_student_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_student_info(name="Alice", age=20, grade="A")
```

```output
name: Alice
age: 20
grade: A
```

Combining both args and kwargs

```python
def print_info(name, *args, **kwargs):
    print(f"Name: {name}")
    print("Additional info:", args)
    print("Details:", kwargs)

print_info("Alice", 25, "Engineer", country="USA", city="New York")
```

## List

Append new element to list

```python
li = [1,2,2,3]

li.append(4)
li += [4]

[2] + [1] ## -> [2,1]
```

## Non-Sequence Types

In Python, non-sequence types are objects that do not store elements in a specific order and do not support indexing or slicing.

-   Set, Dictionary, Numbers(int,float, complex), bool, None

## Dictionnary

```python
info = {"name": "Alice", "age": 30}
for key in info:
    print(key)  # Output: name, age

# Iterating over keys and values
for key, value in info.items():
    print(key, value)  # Output: name Alice, age 30
```

### Exam exercise

```python
# Example list
my_list = [10, 20, 30, 40, 50]

# Initialize an empty dictionary
mydict = {}

# Iterate over the list using enumerate
for index, value in enumerate(my_list):
    # Add the index and value to the dictionary
    mydict[index] = value

# Print the dictionary to verify the result
print(mydict)
```

#### Dict comprehension

```python
# Create the dictionary using dictionary comprehension
mydict = {index: value for index, value in enumerate(my_list)}
```

### exercise illias

```python
q_dict = {'idx': [],'qm':[], 'cat': []}

for idx, value in enumerate(q):
    q_dict['idx'].append(idx)
    q_dict['qm'].append(value)

    # you can also use if, elif, else
    # if value < 0.2
    # elif value < 0.4
    # elif < 0.6....
    match value:
        case value if 0.2 > value >= 0:
            q_dict['cat'].append('bad')
        case value if 0.4 > value >= 0.2:
            q_dict['cat'].append('weak')
        case value if 0.6 > value >= 0.4:
            q_dict['cat'].append('balanced')
        case value if 0.6 <= value < 0.8:
            q_dict['cat'].append('good')
        case value if 0.8 <= value <= 1:
            q_dict['cat'].append('very good')
```

## String formating

There are multiple ways here are two:

### Formatted String Literals

Start with an f or F. Allows including variable names with {}.

Example: right align and use 5 spaces including var1

```python
print(f"{var1:>5}")
```

Example: self documentation and debugging: returns var name and what is stored `var1= -> var1=7`

```python
print(f"{var1=}")
```

### Format() Method

String objects provides methods/functions and apply it to string object

More flexible way to string literals: {} only placeholders, must be specified in format()

```python
var1 ='world'
var2 = 7

print("hello {} {}".format(var1, var2))
print("hello {1} {0}".format(var2, var1))

dict = {'num': 7, 'txt': 'world'}
print("hello {0[txt]} {0[num]}".format(dict))
```

### C-style string format

```python
first_name = input("Enter your first name: ") # your input: Anna
last_name = input("Enter your last name: ") # your input: Meier
birth_year = input("Enter your birth year: ") # your input: 1998
username = "%s%s%s" % (first_name[0].lower(), last_name[:3].lower(), birth_year[-2:])
print("Generated username: %s" % username)

#output: Generated username: amei98
```

### test whether letter of string is digit or str:

Use `string.isdigit()` and `string.isalpha()`

-   ‘.’, ‘(space)’ or ‘,’ are not seen as letters

```python
string = 'Python 3.2'

cnt_digits = 0
cnt_str = 0

for s in string:
  if s.isdigit():
    cnt_digits += 1
  elif s.isalpha():
    cnt_str + = 1
```

## File Handling

`open(file_name, mode)` creates file object in python. It opens a pipe stream of the file that must be closed again `close()`.

Python provides a way to handle close with the function `with`. As soon as the block is left, the file is closed.

```python
with open(file_name, mode) as file_object:
  ...
  ...
  ...
```

### Read

## Object Oriented Programming

Variables are references to objects and objects belong to a class.

`x = 99` is a references to storage location of a object of class int

### Class

Blueprint for what an object should look like and how it should function. Has several elements. Functions are called methods (inside a class)

-   header: indicates beginning of class
-   **init**(): constructor (build) for objects
-   variables: Class and object
-   self: reference to the object that is created
-   class variable: -A class variable in Python is a variable that is shared among all instances of a class. It is defined *within the class but outside of any instance methods*. Class variables are commonly used when a value needs to be *consistent across all instances of a class*.
    -   In methods you can access a class variable with for example: `Customer.class_variable_name` no self. is needed.

### Class Methods

### Static Methods

Same as regular function but defined in a class. Still they are rather independent of the class but are accessed with class.function. No self is needed.

```python
class A:
  def __init__(self):
    ...

  @staticmethods
  def function(str):
    return function(str)

class.function
```

### Object Methods

```python
class PackageName:
  """
  Description
  """
  def __init__(self, name: str, quality: str) -> none:
      self.name = name
      self.quality = quality
# create an object from this class

x: PackageName = PackageName(name = 'ggplot', quality = 'high') #self becomes x
```

<iframe data-external="1" src="https://www.youtube.com/embed/rLyYb7BFgQI" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

### Dunder Methods

How should objects of a class behave for certain operations

```python
class A:
  ...

  def __add__(self,other):
    return f'{self.name} + {other.name}'


x = A()
y = A()

print(x + y)
```

### Subclass

Inheritance creates a hierarchy of classes

-   Animal -> Bird and Cow

test with `issubclass(Bird, Animal)`. Child classes get all properties from parent class.

#### Inheritance

We can use `super()` to refer to the upper level class (parent class in this case) If we first create a class, the function of the object class if inhereted to our created object.

```python
class Animal(object class):
  def __init__(self, weight):
    self.weight = weight

class Bird(Animal):
  def _init__(self, weight): #override
    super().__init__(weight)
    # or Animal.__init__(self, weight)
```

#### Inheritance: Override

We don’t want all methods or variables from parent class. The interpreter first checks methods and objects in the subclass before it checks the parents, so we can just overwrite the objects in the subclass (or extend functionality). We have to use the same name for the method or other objects!

### Access Modifiers

-   public: access through object
-   protected: only in subclass accessible
    -   create with self.\_name. Is used to mark internal use in class and subclass
-   private: only in declaration of own class accessible
    -   create with self.\_\_name. Python internally renames variable. Can’t be accessed in sub classes

#### Example private attribute and private method:

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private attribute

    def __secret_method(self):  # Private method
        print("This is a secret method!")

    def get_balance(self):
        return self.__balance  # ✅ Allowed within the class

# Trying to access private members
account = BankAccount(1000)
# print(account.__balance)  # ❌ AttributeError
# account.__secret_method()  # ❌ AttributeError

# Accessing private members using name mangling (not recommended)
print(account._BankAccount__balance)  # ✅ Works, but discouraged
account._BankAccount__secret_method()  # ✅ Works, but discouraged
```

#### Example protected attribute and protected method:

```python
class Car:
    def __init__(self, brand):
        self._brand = brand  # Protected attribute

    def _show_brand(self):  # Protected method
        print(f"Brand: {self._brand}")

class SportsCar(Car):
    def display(self):
        print(f"Sports Car Brand: {self._brand}")  # ✅ Allowed in subclass

# Accessing protected attributes and methods
c = Car("Tesla")
print(c._brand)  # ⚠️ Allowed but discouraged
c._show_brand()  # ⚠️ Allowed but discouraged
```

## Mulitple inheritance

Multiple parents. Can cause problems for the interpreter if same methods twice.

Solved with Method Resolution Order (MRO): tries to find a linearization of all classes and depends on the order of inheritance. It doesn’t find a feasible solution every time. Sometimes it helps to swap order.

## Modules

paths when import:

-   the current script sets the root for the ide but not for the terminal.
-   with `..` you can move up in the folder hierarchy.
-   instead of / or \\ python uses .
-   `from math import *` imports everything and you can refer to the function without `math.`
    -   not a good style since it can cause problems

## If name = main

the name of the script is only *main* if it’s the root script.

So if you add:

```python
if __name__ = "main":
  ...tests
```

you can code functionality that only runs when the script is the root and doesn’t run when the file has been imported into a different script.

## Deep vs. Shallow Copy

Variable stores references to an object that is stored in *one or more(string, lists, tuples..)* storage cells. So copying a variable, copies the reference:

```python
x = 99.23
y = x # copy of reference

id(x) == id(y)

x = 43.12
id(x) == id(y)

# But..
a = 19.2
b = 19.2

id(a) == id(b) #two different instances of object int
```

```output
False
```

Assigning a new value creates a new instance of object int by calling: `b = int.__new__(value)`.

Lists are mutable objects: x only refers to the first element of list.

```python
x = [1,2,3,4,5]

y = x  #copy
y[2] = 6 #change 3 element, doesnt' create a new object!!

print(x)

y[0] = 9
id(x) == id(y)
```

```output
[1, 2, 6, 4, 5]
```

```output
True
```

This is a side effect. So we can create a real copy with the `copy()` function. Only available for mutable objects (sequences), so not for tuples.

```python
x = [1,2,3,4,5]

y = x.copy()

id(x) == id(y)

str_text = 'hello'

#str_copy = str_text.copy() doens't work since string gernally not mutable
```

Nested Lists = special case. `copy()` *returns a shallow copy!*: Nested lists are references to new storage location

```python
nested_list = [1,2,3,[4,5]]

y = nested_list.copy()

y[-1][0] = 99

print(y)
print(f'not desired change: {nested_list=}')

print(f'{id(y) == id(nested_list)=}')
```

```output
[1, 2, 3, [99, 5]]
not desired change: nested_list=[1, 2, 3, [99, 5]]
id(y) == id(nested_list)=False
```

```python
#import copy
nested_list = [1,2,3,[4,5]]

#y = nested_list.copy.deepcopy(nested_list)
y[-1][0] = 99

print(f'didn\'t change: {nested_list=}')
```

## Lambda Function

Keep in mind:

```python
def my_fun():
  def inner_fun(x):
    return x
  return inner_fun

my_if = my_fun() #reference to inner function
print(my_if('hello'))

#is the same as

my_if = my_fun #reference to outer function
print(my_if()('hello'))
```

Lambda: No header. Only body of function. Only one expression.

```python
x = lambda a,b: a + b

print('x: ', x(3,5))
```

```output
x:  8
```

```python
def fun():
  return 'hello'

x = lambda: fun()

print('x: ', x())

x = lambda a: a()
print('x: ', x(fun))
```

```output
x:  hello
x:  hello
```

We can use lambda for generic methods example:

```python
def fun_ii(f, a, b):
  return f(a,b)

print('fun_ii: ' , fun_ii(lambda x,y: x + y, 2, 3))
print('fun_ii: ' , fun_ii(lambda x,y: x - y, 2, 3))
```

```output
fun_ii:  5
fun_ii:  -1
```

Usually combined with other functions like `map()` or `sort()`.

`map()`: applies a function to every single item of an iterable. Same as for loop.

```python
numbers = [1,2,3,4]
test = map(lambda element: element-1,numbers) #we get a map object back

test = list(map(lambda element: element-1,numbers)) #create a list. List(test)
test
```

```output
[0, 1, 2, 3]
```

`sort()`: sorts an iterable based on a given comparator

```python
#sorts based on remains after modulo
numbers = [1,2,3,4,6]

numbers.sort(key= lambda element: element %3)
print(numbers)
```

```output
[3, 6, 1, 4, 2]
```

## List Comprehension

Single expression of for loop:

```python
x = [1,2,3,4,5,6]
print(x)

x2 =[i**2 for i in x]
print(x2)

x = [i**2 for i in x]
print(x)
```

```output
[1, 2, 3, 4, 5, 6]
[1, 4, 9, 16, 25, 36]
[1, 4, 9, 16, 25, 36]
```

Add conditions

```python
x = [1,2,3,4,5,6]

x2 = [i**2 for i in x if i%2] #unequal numbers (>0 equals true)
print(x2)

x3 = [i**2 for i in x if not i%2] #equal numbers !(>0 equals true)
print(x3)

x4 = [i**2 if not i%2 else i-10 for i in x] #if else short-hand
print(x4)
```

```output
[1, 9, 25]
[4, 16, 36]
[-9, 4, -7, 16, -5, 36]
```

Nested Looops

```python
li = [[1,2,3],[22,33]]

res = [element*2 for row in li for element in row] #simple list return
res2 = [[element*2 for element in row] for row in li] #nested list return
print(res)
print('\n')
print(res2)
```

```output
[2, 4, 6, 44, 66]

[[2, 4, 6], [44, 66]]
```

Comprehension with tuples returns a generator but you can use unpacker `*`.

```python
word_list = ["apple", "banana", "cherry", "date"]

# Use list comprehension to add "__" to every entry
modified_list = [word + "__" for word in word_list]
```

## Dictionairy comprehension

`zip()` returns list of tuples

```python
#turn into dict
x = [1,2,4,5]

d = {i:i for i in x}
print(d)
d1 = {k:v for (k,v) in enumerate(x)}
print(d1)

d2 = {k:v for (k,v) in zip(['a','b','c'],x)}
print(d2)
```

```output
{1: 1, 2: 2, 4: 4, 5: 5}
{0: 1, 1: 2, 2: 4, 3: 5}
{'a': 1, 'b': 2, 'c': 4}
```

```python
from random import sample

class Stream:
    def __init__(self, id):
        self.my_id = id

    def __repr__(self):
        return f"Stream obj: {self.my_id}"

# Create 10 stream objects with random IDs (e.g., from 1 to 100)
stream_objects = [Stream(id) for id in sample(range(1, 101), 10)]

# Print each stream object using unpack operator
print(*stream_objects, sep='\n')
```

```output
Stream obj: 40
Stream obj: 7
Stream obj: 91
Stream obj: 11
Stream obj: 71
Stream obj: 82
Stream obj: 39
Stream obj: 15
Stream obj: 45
Stream obj: 73
```

## Try-Except

Strict order:

-   try:
-   except: (optional if there is finally)
-   else: (optional, *executed only if no exception is raised.*)
-   finally: (optional if there is except, is executed always no matter what)
    -   finally still breaks code if there is an error so everything after finally is not executed (if no exception is given).
    -   finally is good for garbarge collection: delete used variable in try, close files etc. or to give message why something went wrong

```python
try:
  num = input('Enter a number: ')
  frac = 1/int(num)
except ValueError as e:
  print('no number given:', e)
except ZeroDivisionError:
  print('can not divide by 0')
except:
  print('any other error happend')
else:
  print(f'the fraction is: {frac}')
finally:
  print('leaving try-except clause')
```

Exceptions are handled in order and once one is executed the reset is skipt including else statement. For example the second ZeroDivisionError will not be executed.

```python
try:
  num = input('Enter a number: ')
  frac = 1/int(num)
except (ValueError,ZeroDivisionError) as e:
  print('no number given:', e)
except ZeroDivisionError:
  print('can not divide by 0')
except:
  print('any other error happend')
else:
  print(f'the fraction is: {frac}')
finally:
  print('leaving try-except clause')
```

```output
any other error happend
leaving try-except clause
```

These examples are explicit Exceptions since we specifiy the excat error. If we use `except Exception as e` then this is implicit.

```python
def strselect(string,key,p):
    return_list = []
    for i in string:
        try:
            if i[p] == key:
                return_list.append(i)
        except IndexError as e:
            print("string index out of range")
    return return_list

#possible function call:
print(strselect(["hello", "of", "help", "world"], key = "l", p = 2))
```

```output
string index out of range
['hello', 'help']
```

### Customize and Raise Errors

Using the keyword `raise` we can raise an error:

If creating an own CustError class don’t inheritage from BaseException.

```python
class CustError(Exception):
  def __init__(self,message):
    super().__init__(message)

    # customize error code..
    self.errors = "custom error"

if input('enter number: ') == '0':
  raise CustError('customized error message')

def invert_value(val):
  if type(val) != int:
    raise ValueError('the given value is not of type integer.')

  return 1/val

try:
  invert_value(19.2)
except ValueError as e:
  print(e)

  #returns our custome message
```

## Generator

*Iterable*

Objects that implements the `__iter__()` method and returns an iterator Examples: lists,tuples, sets, strings

```python
# Iterable object (list)
my_list = [1, 2, 3]

# Create an iterator from the iterable
my_iterator = iter(my_list)

# Checking if the iterator is an iterable
print(isinstance(my_iterator, Iterable))  # True (because an iterator is iterable)

# Iterating through the iterator
print(next(my_iterator))  # Output: 1
print(next(my_iterator))  # Output: 2
print(next(my_iterator))  # Output: 3

# The following call will raise StopIteration as all items are exhausted
# print(next(my_iterator))  # StopIteration
```

*Iterator:*

In `for i in li:` the keyword `for` creates an iterator and passes the provided list (iterable). The iterator points to the first element of the list and the object is returned. The we call the `__next__()` method of this object to get the second object in li until `__next__()` raises an *StopIteration* exception. An iterator is always an iterable but not all iterables are iterators

-   str, lists, tuples, sets, dictionaries, ranges, files, generators

```python
x = list(range(9))

itr = iter(x)

itr.__next__()
itr.__next__()
print('-'*10)
# Iterator remembers current position so for loop will only print remaining i's
for i in itr:
  print(i)

# raises error
#itr.__next__()
```

```output
----------
2
3
4
5
6
7
8
```

```python
# A generator expression
gen_expr = (x * 2 for x in range(5))

next(gen_expr)
```

### non-Iterable

a non-iterable object is an object that cannot be looped over:

-   int, float, bool, complex, none

### Concept of Generator (Generator Function)

Each iteration is called on demand and not at the start: saving memory (lazy evaluation)

-   Uses yield keyword instead of return and returns a generator iterator.
-   Breaks at each yield but remembers where it was and can be continuied until StopIterator is raised
-   can be written as generator expression without yield: `(x**2 for x in range(4))`

```python
def my_sum(x):

  return x + 2

def my_sum_gen(x):

  y = x
  while True:

    yield y + 2
    yield y + 5


r2 = my_sum_gen(7)

print(next(r2))
print(next(r2))
```

```output
9
12
```

Example

“In ordered large list are there values smaller than 0?”

```python
k = range(1_000_000)
any(x < 0 for x in k)
```

```output
False
```

```python
# A generator function
def my_generator():
    yield 1
    yield 2
    yield 3

# Create a generator object
gen = my_generator()

# Using the generator object in a for loop (iteration)
for value in gen:
    print(value)
```

```output
1
2
3
```

## Largest number: delete if in last position

```python
for i in numbers[:-1]: #go through numbers except last
    if i == max(numbers):
        break #exit loop: max number not last position
else: #is executed only if for loop comes to end
    numbers.pop() #removes last number
```

## OOP Buildings

```python
class Building:
    # Class variables
    _counter = 0
    _id_container = []

    def __init__(self, number_of_floors):
        # Object variables
        self._number_of_floors = number_of_floors
        self._building_id = self._get_new_id()  # Assign building id at creation

    def _get_new_id(self):
        # Increment counter and create a new building ID
        Building._counter += 1
        building_id = Building._counter
        if building_id in Building._id_container:
            raise ValueError(f"Building ID {building_id} is already taken.")
        Building._id_container.append(building_id)
        return building_id

    def get_number_of_floors(self):
        # Return the number of floors for the building
        return self._number_of_floors

class OfficeBuilding(Building):
    def __init__(self, number_of_floors, number_of_working_places):
        # Call parent class constructor to initialize number_of_floors and building_id
        super().__init__(number_of_floors)
        # Additional object variable for office buildings
        self._number_of_working_places = number_of_working_places

    def get_number_of_working_places(self):
        # Return the number of working places for the office building
        return self._number_of_working_places

# Create a Building object with 10 floors
building_1 = Building(10)
# Create an OfficeBuilding object with 15 floors and 200 working places
office_building_1 = OfficeBuilding(15, 200)

# Print building IDs and number of floors for both buildings
print(f"Building 1 ID: {building_1._building_id}, Floors: {building_1.get_number_of_floors()}")
print(f"Office Building 1 ID: {office_building_1._building_id}, Floors: {office_building_1.get_number_of_floors()}, Working Places: {office_building_1.get_number_of_working_places()}")
```

## Lambda Divisor 3

```python
# Define the lambda function using conditional expression
divisible_by_3 = lambda num: True if num % 3 == 0 else False

# Example list (even_list)
even_list = [2, 3, 6, 8, 9, 12, 15, 20, 21, 24]

# Use the lambda function to filter the numbers divisible by 3
divisible_by_3_list = [num for num in even_list if divisible_by_3(num)]

# Print the resulting list
print(divisible_by_3_list)
```

## Lambda dict

```python
# Example list
even_list = [2, 3, 6, 8, 9, 12, 15, 20, 21, 24]

# Create dictionary using lambda function and dictionary comprehension
divisible_dict = {num: (lambda x: True if 98729 % x == 0 else False)(num) for num in even_list}

# Print the resulting dictionary
print(divisible_dict)
```

## Customer

```python
#!/usr/bin/ python

class Customer():

    custType = 'standard'
    custNo = 0

    def __init__(self, first_name, last_name, company_name):
        self.f_name = first_name
        self.l_name = last_name
        self.c_name = company_name
        self.custNo = None                      # customer number
        self.dist2hub = None                    # distance to storage hub
        self.avgDelPerYear = None               # average no of deliveries per year
        self.recCargoWeight = None              # recording (list) of delivery weights

    def load_cust_data(self):
        '''
        The method 'load_cust_data()' initializes instance variables that are
        initialized with none. These numbers have no effect on the program
        extension, i.e. are irrelevant for the evaluation.
        '''
        self.custNo = Customer.custNo
        self.dist2hub = (self.custNo+15)*15
        self.avgDelPerYear = 1/self.dist2hub*2250
        self.recCargoWeight = list(range(self.custNo))
        Customer.custNo += 1                    # increment customer number

    def correctCargoWeights(self,correction):
        '''
        For cargoWeight correction, the passed lambda function from the parameter
        list is applied on all elements of the cargoWeight instance variable
        (i.e. the parameter correction points to a lambda function).
        '''
        self.recCargoWeight = list(map(correction, self.recCargoWeight))
```

### Example of Use

```python
# Create a new Customer object
customer1 = Customer("John", "Doe", "ABC Corp")

# Load customer data
customer1.load_cust_data()

# Print customer details
print(f"Customer {customer1.f_name} {customer1.l_name} has ID {customer1.custNo}")
print(f"Distance to Hub: {customer1.dist2hub}")
print(f"Average Deliveries per Year: {customer1.avgDelPerYear}")
print(f"Cargo Weights: {customer1.recCargoWeight}")

# Correct cargo weights using a lambda function (e.g., multiplying each by 2)
customer1.correctCargoWeights(lambda x: x * 2)

# Print corrected cargo weights
print(f"Corrected Cargo Weights: {customer1.recCargoWeight}")
```

Customer John Doe has ID 0 Distance to Hub: 225 Average Deliveries per Year: 10.0 Cargo Weights: \[0\] Corrected Cargo Weights: \[0\]

### SportCustomer in different file

```python
# Assuming that SportCustomer class should inherit from Customer (or any base class)
from customer import Customer

class SportCustomer(Customer):
    def __init__(self, first_name, last_name, company_name):
        # Initialize the parent class (Customer)
        super().__init__(first_name, last_name, company_name)
        self.priority = None  # Initialize the priority instance variable

    def setPriority(self, priority):
        """
        Sets the 'priority' instance variable.
        Raises a ValueError if the passed priority is greater than 100.
        """
        if priority > 100:
            raise ValueError("Priority value cannot be greater than 100")
        self.priority = priority
```

Back to top
