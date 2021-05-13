---
layout: post
title: 'Operator Overloading 重载运算符'
date: 2020-03-10
author: Wen Jian
cover: ''
tags: C++ Basic
---

> 又是一个“新知识”

直接上两道例(zuò)题(yè)吧~

注：因为Code::Blocks编译器在函数返回临时对象时在调用构造函数时会产生歧义（应该是这样吧，我觉得就必要找个时间好好研究研究，先贴一下编译的错误信息），因此本文代码均在Visual C++ 6.0下编译并运行。

``` c++
invalid initialization of non-const reference of type 'Complex&' from an rvalue of type 'Complex'
```

### Problem 1 - Complex
为复数类（Complex）增加重载的运算符-、-=、\*=和/=。设\++为实部和虚部各自增一，亦请重载前置与后置++运算符。分别使用成员函数和友元函数各做一遍（注意：不要放在一个源文件中，**友元函数实现时输入输出头文件为：iostream.h**）并测试。


（复数的乘除法搞得我好懵......）

#### 成员函数版本

需要注意重载自加/自减运算符时的格式。另外也要特别关注函数的类型（是否含“&”）以及参数的设置。

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>

using namespace std;

#define nonfriend 
class Complex
{
private:
    int Real,Image;
public:
    Complex(int i=0,int r=0):Real(r),Image(i){}
    ~Complex(){}
    Complex(Complex &C)
    {
        Real=C.Real, Image=C.Image;
    }
    void print()
    {
        cout<<Real<<((Image<0)?'-':'+')<<abs(Image)<<'i'<<endl;
    }
    Complex operator - (const Complex &);
    Complex operator + (const Complex &);
    Complex operator * (const Complex &);
    Complex operator / (const Complex &);

    Complex &operator -= (const Complex &);
    Complex &operator += (const Complex &);
    Complex &operator *= (const Complex &);
    Complex &operator /= (const Complex &);

    Complex &operator -- ();
    Complex operator -- (int);

    Complex &operator ++ ();
    Complex operator ++ (int);
};

Complex Complex::operator - (const Complex &C)
{
    return Complex(Real-C.Real,Image-C.Image);
}
Complex Complex::operator + (const Complex &C)
{
    return Complex(Real+C.Real,Image+C.Image);
}
Complex Complex::operator * (const Complex &C)
{
    return Complex(Real*C.Real-Image*C.Image,Real*C.Image+Image*C.Real);
}
Complex Complex::operator / (const Complex &C)
{
    return Complex((Real*C.Real+Image*C.Image)/(C.Real*C.Real+C.Image*C.Image),(Image*C.Real-Real*C.Image)/(C.Real*C.Real+C.Image*C.Image));
}

Complex &Complex::operator -= (const Complex &C)
{
    Real-=C.Real, Image-=C.Image;
    return *this;
}
Complex &Complex::operator += (const Complex &C)
{
    Real+=C.Real, Image+=C.Image;
    return *this;
}
Complex &Complex::operator *= (const Complex &C)
{
    Real=Real*C.Real-Image*C.Image;
    Image=Real*C.Image-Image*C.Real;
    return *this;
}
Complex &Complex::operator /= (const Complex &C)
{
    Real/=C.Real, Image/=C.Image;
    return *this;
}

Complex &Complex::operator -- ()
{
    --Real, --Image;
    return *this;
}
Complex Complex::operator -- (int)
{
    return Complex(Real--,Image--);
}

Complex &Complex::operator ++ ()
{
    ++Real, ++Image;
    return *this;
}
Complex Complex::operator ++ (int)
{
    return Complex(Real++,Image++);
}

int main()
{
    Complex c1(1,2),c2(3,7);

    cout<<"c1="; c1.print();
    cout<<"c2="; c2.print();

    Complex c3(5,7),c4(2,1),temp;

    temp=c3-c4; cout<<"c3-c4="; temp.print();

    c3-=c4; cout<<"c3-=c4 c3="; c3.print();
    c3*=c4; cout<<"c3*-c4 c3="; c3.print();
    c3/=c4; cout<<"c3/=c4 c3="; c3.print();

    cout<<"c3="; c3.print();
    cout<<"c4="; c4.print();
    cout<<"c3--: "; (c3--).print();
    cout<<"--c4: "; (--c4).print();
    cout<<"c3++: "; (c3++).print();
    cout<<"++c3: "; (++c3).print();

    system("pause");
    return 0;
}
```

#### 友元函数版本

还是需要注意友元函数和成员函数的不同之处。
因为两个版本的main函数完全相同，就不把main函数贴上来了。

``` c++
#include<iostream.h>
#include<stdio.h>
#include<stdlib.h>

#define Friend
class Complex
{
private:
    int Real,Image;
public:
    Complex(int i=0,int r=0):Real(r),Image(i){}
    ~Complex(){}
    Complex(Complex &C)
    {
        Real=C.Real, Image=C.Image;
    }
    void print()
    {
        cout<<Real<<((Image<0)?'-':'+')<<abs(Image)<<'i'<<endl;
    }
    friend Complex operator - (Complex &,const Complex &);
    friend Complex operator + (Complex &,const Complex &);
    friend Complex operator * (Complex &,const Complex &);
    friend Complex operator / (Complex &,const Complex &);

    friend Complex &operator -= (Complex &,const Complex &);
    friend Complex &operator += (Complex &,const Complex &);
    friend Complex &operator *= (Complex &,const Complex &);
    friend Complex &operator /= (Complex &,const Complex &);

    friend Complex &operator -- (Complex &);
    friend Complex operator -- (Complex &,int);

    friend Complex &operator ++ (Complex &);
    friend Complex operator ++ (Complex &,int);
};

Complex operator - (Complex &C1,const Complex &C2)
{
    return Complex(C1.Real-C2.Real,C1.Image-C2.Image);
}
Complex operator + (Complex &C1,const Complex &C2)
{
    return Complex(C1.Real+C2.Real,C1.Image+C2.Image);
}
Complex operator * (Complex &C1,const Complex &C2)
{
    return Complex(C1.Real*C2.Real-C1.Image*C2.Image,C1.Real*C2.Image+C1.Image*C2.Real);
}
Complex operator / (Complex &C1,const Complex &C2)
{
    return Complex((C1.Real*C2.Real+C1.Image*C2.Image)/(C2.Real*C2.Real+C2.Image*C2.Image),(C1.Image*C2.Real-C1.Real*C2.Image)/(C2.Real*C2.Real+C2.Image*C2.Image));
}

Complex & operator -= (Complex &C1,const Complex &C2)
{
    C1.Real-=C2.Real, C1.Image-=C2.Image;
    return C1;
}
Complex & operator += (Complex &C1,const Complex &C2)
{
    C1.Real+=C2.Real, C1.Image+=C2.Image;
    return C1;
}
Complex & operator *= (Complex &C1,const Complex &C2)
{
    C1.Real=C1.Real*C2.Real-C1.Image*C2.Image;
    C1.Image=C1.Real*C2.Image-C1.Image*C2.Real;
    return C1;
}
Complex & operator /= (Complex &C1,const Complex &C2)
{
    C1.Real/=C2.Real, C1.Image/=C2.Image;
    return C1;
}

Complex & operator -- (Complex &C)
{
    --C.Real, --C.Image;
    return C;
}
Complex operator -- (Complex &C,int)
{
    return Complex(C.Real--,C.Image--);
}

Complex & operator ++ (Complex &C)
{
    ++C.Real, ++C.Image;
    return C;
}
Complex operator ++ (Complex &C,int)
{
    return Complex(C.Real++,C.Image++);
}
```

### Problem 2 - Fraction

**参考主函数**定义一个分数类。要求：

（1）创建分数及计算过程中如果出现分母为0应给出适当处理；

（2）分数赋值、计算等得到的结果应为即约分数（最简分数）；

（3）输出格式要求：输出“分子/分母”；如果分子能够整除分母，则输出整除商，如3/1时应输出3；分子为0时输出0；避免形为3/-2的输出，而应输出-3/2；


为什么要强调“参考主函数”呢？因为是一个新题型？？？当然不是——我只是想说明这个main函数（这忒喵的居然是void类型......）的代码不是我敲出来的而已。

需要特别注意 a++/++a 的重载！！！ 

``` c++
#include<iostream.h>
#include<stdio.h>
#include<stdlib.h>

int gcd(int a,int b)
{
    return b==0?a:gcd(b,a%b);
}

class Fraction
{
private:
    int mole,deno;
    bool zero;
public:
    Fraction(int m=0,int d=1)
    {
	if(d==0)
            m=0, d=1, zero=true;
        else
            zero=false;
        int temp=gcd(m,d);
        mole=m/temp, deno=d/temp;
    }
    Fraction(Fraction &f)
    {
        mole=f.mole, deno=f.deno;
    }
    ~Fraction(){}
    void set(int m,int d)
    {
        if(d==0)
            m=0, d=1, zero=true;
        else
            zero=false;
        int temp=gcd(m,d);
        mole=m/temp, deno=d/temp;
    }
    void print()
    {
        if(mole%deno==0)
        {
            cout<<mole/deno<<endl;
            return ;
        }
        if(mole*deno<0)
            cout<<"-";
        cout<<abs(mole)<<"/"<<abs(deno)<<endl;
    }
    int getfz()
    {
        if(zero==true)
            return 0;
        return mole;
    }
    Fraction operator + (const Fraction &);
    Fraction operator / (const Fraction &);
    Fraction & operator ++ ();
    Fraction operator ++ (int);
};

Fraction Fraction::operator + (const Fraction &C)
{
    int new_mole,new_deno,temp;
    new_deno=deno*C.deno;
    new_mole=mole*C.deno+C.mole*deno;
    temp=gcd(new_deno,new_mole);
    return Fraction(new_mole/temp,new_deno/temp);
}

Fraction Fraction::operator / (const Fraction &C)
{
    if(C.mole==0)
    {
        cout<<"Error: Divided by 0!"<<endl;
        exit(0);
    }
    int new_mole,new_deno,temp;
    new_mole=mole*C.deno;
    new_deno=deno*C.mole;
    temp=gcd(new_deno,new_mole);
    return Fraction(new_mole/temp,new_deno/temp);
}

Fraction & Fraction::operator ++ ()
{
    mole+=deno;
    return *this;
}

Fraction Fraction::operator ++ (int)
{
	mole+=deno;
    return Fraction(mole-deno,deno);
}

void main()
{
    Fraction f1(2,6), f2, f3(0), f;
//创建分数（分子、分母），应含分母为0及化简处
    f2.set(3,7);                    //应含分母为0及化简的处理
    cout<<"f1=";
    f1.print();
    cout<<endl;       //应输出1/3
    cout<<"f2=";
    f2.print();
    cout<<endl;

    int k=3;
    cout<<"k="<<k<<endl;
    f=f1+k;                       //分数+整数
    cout<<"f1+k=";
    f.print();
    cout<<endl;
    f=f1+f2;                      //分数+分数
    cout<<"f1+f2=";
    f.print();
    cout<<endl;

    if(f2.getfz()!=0)             //取f2的分子
    {
        f=f1/f2;               //分数相除
        cout<<"f1/f2=";
        f.print();
        cout<<endl;
    }
    else
        cout<<"除数为0，不执行除法"<<endl;

    if(f3.getfz()!=0)             //取f3的分子
    {
        f=f1/f3;               //分数相除
        cout<<"f1/f3=";
        f.print();
        cout<<endl;
    }
    else
        cout<<"除数为0，不执行除法"<<endl;

    f=f1++;       //后置++，假设++使整个分数的值+1
    cout<<"f=f1++=";
    f.print();
    f1.print();
    cout<<endl;
    f=++f2;       //前置++
    cout<<"f=f2++=";
    f.print();
    f2.print();
    cout<<endl;

    system("pause");
}
```

### Problem 3 - My String

- 注意对输入输出流“<<”、“>>”的重载函数的格式，这种函数类型只能是友元函数。另外，别忘记 istream 、 ostream 这个特别的参数。总之，这个重载函数比较特殊，是重点！！！
- 注意对下标“ \[ \] ”的重载函数，这个虽然简单，但是也比较特殊；对“\[”的重载函数不能使用友元函数，必须是成员函数。
- 对“=”的重载函数不能使用友元函数！！！另外，认清编译的信息，下面编译的错误信息就说明“=”必须是成员函数：
``` c++
'operator =' must be a <Unknown> member
```
- 不要对强制转换抱有太大的信心，那个玩意儿常常没有你想的那么智能。

``` c++
#include<iostream.h>
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#define MAXN 100//Default str_size
#define min(a,b) ((a>b)?(b):(a))
#define max(a,b) ((a>b)?(a):(b))

class MyString
{
private:
    char str[MAXN];
    unsigned int len,Size;
public:
    MyString()                                               //Parameterless Constructor
    {
        str[0]='\0';
        len=0, Size=100;
    }
    MyString(char *s)                                        //Constructor
    {
        unsigned int i;
        for(i=0;i<min(strlen(s),Size-1);i++)
        {
            str[i]=s[i];
        }
        str[i]='\0';
        len=i;
        Size=100;
    }
    MyString(MyString &s)                                    //Copy constructor
    {
        strcpy(str,s.str);
        len=s.len, Size=s.Size;
    }
    ~MyString() {}                                           //Destructor
    friend istream & operator >> (istream &input, MyString &s)     //operator >>
    {
		unsigned int add=0;
		char c=input.get();
		while((add<s.Size-1)&&(c!=' ')&&(c!='\n')&&(c!='\0'))
		{
			s.str[add++]=c;
			c=input.get();
		}
		s.len=add;
		s.str[s.len]='\0';
		return input;
    }
    friend ostream & operator << (ostream &output, MyString &s)    //operator <<
    {
        output<<s.str;
        return output;
    }
    friend MyString operator + (MyString &s1, MyString &s2)        //operator + MyString+MyString
    {
        MyString s(s1);
        unsigned int i;
        for(i=s1.len;i<min(s.Size-1,s1.len+s2.len);i++)
        {
            s.str[i]=s2.str[i-s1.len];
        }
        s.str[i]='\0';
        s.len=i;
        return s;
    }
    friend MyString operator + (MyString &s1, const char *s2)      //operator + MyString+MyString
    {
        MyString s(s1);
        unsigned int i;
        for(i=s1.len;i<min(s.Size-1,s1.len+strlen(s2));i++)
        {
            s.str[i]=s2[i-s1.len];
        }
        s.str[i]='\0';
        s.len=i;
        return s;
    }
    friend MyString & operator += (MyString &s1, MyString &s2)     //operator += MyString+=MyString
    {
        unsigned int i;
        for(i=s1.len;i<min(s1.Size-1,s1.len+s2.len);i++)
        {
            s1.str[i]=s2.str[i-s1.len];
        }
        s1.str[i]='\0';
        s1.len=i;
        return s1;        
    }
	friend MyString & operator += (MyString &s1, const char *s2)   //operator += MyString+=char string
    {
        unsigned int i;
        for(i=s1.len;i<min(s1.Size-1,s1.len+strlen(s2));i++)
        {
            s1.str[i]=s2[i-s1.len];
        }
        s1.str[i]='\0';
        s1.len=i;
        return s1;        
    }
    MyString & operator = (const char *s)                          //operator = char string
    {
		if(s==NULL)
		{
			str[0]='\0';
			len=0;
			return *this;
		}
        unsigned int i;
        for(i=0;i<min(strlen(s),Size-1);i++)
        {
            str[i]=s[i];
        }
        str[i]='\0';
        len=i;
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
  cout<<"str1="<<str1<<"\nstr2="<<str2<<"\nstr3="<<str3<<"\nstr="<<str<<endl ;
  
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
