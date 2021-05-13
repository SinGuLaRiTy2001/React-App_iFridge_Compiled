---
layout: post
title: 'Dynamic Memory Allocation 动态分配内存'
date: 2020-04-15
author: Wen Jian
cover: ''
tags: C++
---

> 调了一整晚的代码是什么样的体验？

指针是真的不好伺候：只要稍不注意就指到了某个不为人所知的角落。。。然后就是—— "0xC0000005: Access Violation" ，单步调试也看不来，爽歪歪~

### Knowledge Point 动态分配内存

首先我们需要知道，程序占用的内存区，分为代码区（储存程序代码）、全局数据区（储存全局变量、静态变量）、局部数据区（也叫“栈区”，储存局部变量/自动变量），还有就是自由存储区（也叫“堆区”，储存动态变量）。

动态分配的内存空间就属于自由存储区。

通常，我们要申请一个动态空间，就会使用语句： `int *p=new int;` 。在此基础上，可以通过 `int *p=new int(5);` 来赋初值。 其中，p为指针，用来接收被分配到的地址，而 new int 就指向新的内存空间。格式就是： `Pointer = new <type> (initial value);` 

在使用完动态空间时，我们需要将它进行释放，释放空间通过语句 `delete p;` 实现，在此之后，我们可以再加一条语句 `p=NULL;` ，防止通过 p 非法访问到了别的地方。（我觉得指针这一点就比较“灵活”，稍不留神就非法访问了，要格外注意！！！）

#### 动态数组

我们可以通过申请一段连续的动态空间，将其作为一个动态数组： `int *p=new int[100];` 这样我们就相当于构造了一个数组 p[100] ，我们可以通过 p[i] 或 \*(p+i) 来访问其中的元素。

要释放这一段连续的空间，我们可以通过 `delete [] p;` 实现。在这里要务必注意中括号！如果只是 `delete p;` 则相当于只释放了 p[0] 对应的内存空间。

#### 多维动态数组

以二维数组为例，有两种方式：

- 元素指针 `int *p=new int[3][5];` ，步长以单个元素为单位，通过 `*(p+i*5+j)` 来访问元素
- 行指针 `int (*p)[5]=new int[3][5];` ，步长以一行为单位，通过 `p[i][j]` 访问元素

三维的也类似： `double (*p)[20][30]=new double[10][20][30];` 

你要问我更喜欢哪一个的话——当然是第二个咯~

多维动态数组释放空间**与一维数组完全相同**，也是用 `delete [] p;` ，不要在后面加好几个中括号啦！

#### 指针数组

`char **p=new int*[5];` 要特别注意因为是指针数组，因此在 p 的前面有两个 ‘\*’ 。

我们可以通过将指针数组里的指针元素指向一系列的一维数组，来间接创建一个二维数组，这一步操作可以通过 for 循环语句依次执行 `p[i]=new char[10]` 来实现。

#### 结构体

结构体也是可以动态分配的~ 语句： `Person *p=new Person("Selina",19);`

#### 对象

对象可不可以用类似于上面结构体的操作来动态分配呢？答案是**不可以**的！事实上，因为要重写赋数据成员的函数，类对象的动态分配是比较繁琐（也不是那么繁琐~），可以看看这篇博文学习一下 [\<传送门\>](https://www.cnblogs.com/Abudlla/p/9127756.html) 

#### 其它的一些注意点

- 申请了动态空间之后，不能随意舍弃这个内存空间（会导致内存泄漏），要记得及时释放
- 内存空间可以被另一个内存空间接管，也就是说，我们可以另外用一个指针指向已经申请的内存空间
- 不能重复释放同一个内存空间。这里需要说明一点：释放空间针对的是指针指向的地址，而不是指针本身，因此如果代码中存在多个指针指向同一个动态分配的内存空间，要格外注意避免内存空间的重复释放！！！
- 每次申请空间前，最好先检查该指针是否指向其它内存空间，如果是，那么就要先释放先前的空间，在申请新的空间；每次申请空间后，也要通过检查该指针是否为空判断是否申请成功
- 每次释放指针对应的空间之前，需要先判断该指针对应的空间是否已经释放过了，这样就可以最大程度的避免重复释放。

#### 为对象成员动态分配内存

<实现**深复制**> 如果为对象的成员动态分配内存空间，那么除了自己构造构造函数、析构函数并在其中添加申请、释放空间的语句，在其它的诸如复制构造、运算符重载（!!!）等函数中也要注意检查是否有必要自己单独构造一个。

如果缺省了某些函数，那么**系统在调用默认的函数时就可能会发生指针指向错误（非法访问）、重复释放、内存泄漏等问题**。相反，如果在调试时出现这些问题，除了检查代码本身是否有误、指针的赋值情况之外，还要检查是否替代了默认的函数，防止系统在调用默认函数时出错。

为什么我要如此强调这一点？你看看下面的这道题就知道了~ qwq

### Problem 用动态分配构造MyString类

#### Discription 题目描述

编写程序：参考主函数，采用动态分配内存的方法，自定义一个字符串类 mystring；

成员数据：

- char \*str; //存放字符串的动态字符数组的起始地址
- int len; //字符串长度

主函数：和之前的MyString一样 [\<传送门\>](https://singularity2001.github.io/2020/03/10/OperatorOverloading-%E9%87%8D%E8%BD%BD%E8%BF%90%E7%AE%97%E7%AC%A6.html#problem-3---my-string)

#### Source Code 代码

> 以下代码在 VC 6.0 环境下编译运行

``` c++
#include<iostream.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#define min(a,b) ((a>b)?(b):(a))
#define max(a,b) ((a>b)?(a):(b))

class MyString
{
private:
    char *str;
    unsigned int len;
public:
    MyString()                                               //Parameterless Constructor
    {
        str=NULL;
		len=0;
    }
    MyString(char *s)                                        //Constructor
    {
        if(s)
			if(str=new char[strlen(s)+1])
			{
				cout<<"[Constructor] Memory allocated successfully! Address: "<<(int) &str<<endl;

				strcpy(str,s);
				len=strlen(s);
			}
		else 
		{
			str=NULL;
			len=0;
		}
    }
    MyString(MyString &s)                                    //Copy constructor
    {
        len=s.len;
		if(!s.str)
		{
			if(str=new char[1])
			{
				cout<<"[Copy Constructor] Memory allocated successfully! Address: "<<(int) &str<<endl;

				strcpy(str,"");
			}
		}
		else
		{
			if(str=new char[len+1])
			{
				cout<<"[Copy Constructor] Memory allocated successfully! Address: "<<(int) &str<<endl;

				strcpy(str,s.str);
			}
		}
    }
    ~MyString()                                              //Destructor
	{
		if(str)
			delete [] str;
	}
    friend istream & operator >> (istream &input, MyString &s)     //operator >>
    {
		if(s.str)
			delete [] s.str;
		char temp[10000];
		input>>temp;
		if(temp!=NULL)
			if(s.str=new char[strlen(temp)+1])
			{
				cout<<"[operator >>] Memory allocated successfully! Address: "<<(int) &s.str<<endl;

				strcpy(s.str,temp);
				s.len=strlen(temp);
			}
		else 
		{
			s.str=NULL;
			s.len=0;
		}
		return input;
    }
    friend ostream & operator << (ostream &output, MyString &s)    //operator <<
    {
		if(s.str)
			output<<s.str;
		else
			output<<'\0';
        return output;
    }
    friend MyString operator + (MyString &s1, MyString &s2)        //operator + MyString+MyString
    {
		MyString s;
		if(s.str=new char[s1.len+s2.len+1])
			cout<<"[operator MyString+MyString] Memory allocated successfully! Address: "<<(int) &s.str<<endl;
		else
		{
			cout<<"Error: Failed to allocate memory."<<endl;
			exit(0);
		}

		for(unsigned int i=0;i<s1.len;i++)
			s.str[i]=s1.str[i];
		for(unsigned int j=0;j<s2.len;j++)
			s.str[j+s1.len]=s2.str[j];
		s.len=s1.len+s2.len;
		s.str[s.len]='\0';
		return s;
	}
    friend MyString operator + (MyString &s1, const char *s2)      //operator + MyString+char string
    {
        MyString s;
		if(s.str=new char[s1.len+strlen(s2)+1])
			cout<<"[operator MyString+char string] Memory allocated successfully! Address: "<<(int) &s.str<<endl;
		else
		{
			cout<<"Error: Failed to allocate memory."<<endl;
			exit(0);
		}

		for(unsigned int i=0;i<s1.len;i++)
			s.str[i]=s1.str[i];
		for(unsigned int j=0;j<strlen(s2);j++)
			s.str[j+s1.len]=s2[j];
		s.len=s1.len+strlen(s2);
		s.str[s.len]='\0';
		return s;
    }
    friend MyString & operator += (MyString &s1, MyString &s2)     //operator += MyString+=MyString
    {
		char *temp=s1.str;
		if(s1.str=new char[s1.len+s2.len+1])
			cout<<"[operator MyString+=MyString] Memory allocated successfully! Address: "<<(int) &s1.str<<endl;
		else
		{
			cout<<"Error: Failed to allocate memory."<<endl;
			exit(0);
		}

		for(unsigned int i=0;i<s1.len;i++)
			s1.str[i]=temp[i];
		if(temp)
			delete [] temp;
		for(unsigned int j=0;j<s2.len;j++)
			s1.str[j+s1.len]=s2.str[j];
		s1.len+=s2.len;
		s1.str[s1.len]='\0';
		return s1;
    }
	friend MyString & operator += (MyString &s1, const char *s2)   //operator += MyString+=char string
    {
        char *temp=s1.str;
		if(s1.str=new char[s1.len+strlen(s2)+1])
			cout<<"[operator MyString+char string] Memory allocated successfully! Address: "<<(int) &s1.str<<endl;
		else
		{
			cout<<"Error: Failed to allocate memory."<<endl;
			exit(0);
		}

		for(unsigned int i=0;i<s1.len;i++)
			s1.str[i]=temp[i];
		if(temp)
			delete [] temp;
		for(unsigned int j=0;j<strlen(s2);j++)
			s1.str[j+s1.len]=s2[j];
		s1.len=s1.len+strlen(s2);
		s1.str[s1.len]='\0';
		return s1;
    }
    MyString & operator = (const char *s)                          //operator = char string
    {
		if(str)
			delete [] str;
		if(!s)
		{
			str=NULL;
			len=0;
			return *this;
		}
		if(str=new char[strlen(s)+1])
			cout<<"[operator =char string] Memory allocated successfully! Address: "<<(int) &str<<endl;
		else
		{
			cout<<"Error: Failed to allocate memory."<<endl;
			exit(0);
		}
		
		strcpy(str,s);
		len=strlen(s);
		return *this;
    }
	MyString & operator = (MyString s1)                            //operator = MyString
    {   
		if(str)
			delete [] str;
		if(s1.str==NULL)
		{
			str=NULL;
			len=0;
			return *this;
		}
		if(str=new char[s1.len+1])
			cout<<"[operator =MyString] Memory allocated successfully! Address: "<<(int) &str<<endl;
		else
		{
			cout<<"Error: Failed to allocate memory."<<endl;
			exit(0);
		}

		strcpy(str,s1.str);
		len=s1.len;
		return *this;
    }
    char & operator [] (int add)                                   //operator []
    {
        return str[add];
    }
    friend bool operator == (MyString &s1, MyString &s2)           //operator ==
    {
        if(s1.len!=s2.len)
            return false;
        for(unsigned int i=0;i<s1.len;i++)
        {
            if(s1.str[i]!=s2.str[i])
                return false;
        }
        return true;
    }
    friend bool operator > (MyString &s1, MyString &s2)            //operator > MyString>MyString
    {
        unsigned int i;
        for(i=0;i<min(s1.len,s2.len);i++)
        {
            if(s1.str[i]<s2.str[i])
                return false;
            if(s1.str[i]>s2.str[i])
                return true;
        }
        return (s1.len>s2.len);
    }
    friend bool operator > (MyString &s1, const char *s)           //operator > MyString>char string
    {
        unsigned int i;
        for(i=0;i<min(s1.len,strlen(s));i++)
        {
            if(s1.str[i]<s[i])
                return false;
            if(s1.str[i]>s[i])
                return true;
        }
        return (s1.len>strlen(s));
    }
};

void main()
{
  MyString str1,str2="0123456",str3("ABCDEF"),str(str3);
  cout<<"str1="<<str1<<"\nstr2="<<str2<<"\nstr3="<<str3<<"\nstr="<<str<<endl;
  
  str1=str2+str3;
  cout<<"str1=str2+str3"<<"\tstr1="<<str1<<endl;

  str1=str2+"abcd";
  cout<<"str1=str2+\"abcd\" "<<"\tstr1="<<str1<<endl;

  str2+=str1;
  cout<<"str2+=str1"<<"\tstr2="<<str2<<endl;
  
  str1='\0';
  str1+="abcdef12";
  cout<<"str1+=\"abcdef12\" "<<"\tstr1="<<str1<<endl;

  str1="21fedcba";
  cout<<"str1+=\"21fedcba\" "<<"\tstr1="<<str1<<endl;

  str1=str2;
  cout<<"str1=str2"<<"\tstr1="<<str1<<endl;

  str1[4]='W';
  cout<<"str1="<<str1<<"str1[4]="<<str1[4]<<endl;
 
  cout<<"Please input a string:\n";
  cin>>str1;
  cout<<"str1="<<str1;
 
  cout<<"( str1>str2 )="<<(str1>str2)<<endl ;
  cout<<"( str1==str2 )="<<(str1==str2)<<endl ;

  cout<<"(str1>\"abcd\")= "<<(str1>"abcd")<<endl;

  system("pause");
}
```

#### Summary 总结

其实吧，只要理解了指针、内存空间这些概念，这个动态分配内存还是比较容易上手的。之所以调这个代码调到了深夜，是因为缺省了 `MyString & operator = (MyString s1)` 函数，这就导致系统在执行 `str1=str2+str3;` 这类 MyString = MyString 的语句时，并没有调用拷贝构造函数（因为没有构造呀！），而是**调用了默认的赋值函数**。当然我们知道，对于指针来讲这是大忌，于是嘛——真就错的离谱。欸，函数这么多，要发现这个问题实在是不容易。😂
