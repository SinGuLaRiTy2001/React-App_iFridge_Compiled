---
layout: post
title: 'More About Functions 函数进阶'
date: 2020-04-07
author: Wen Jian
cover: ''
tags: C++ Template Class&Object Pointer 
---

>以函数作为参数的模板 以及 函数指针——花式求定积分的近似值

为了减少代码量，我们可以将函数作为模板的参数，这样我们就能够在模板中调用不同的函数，进而减少代码量。

### 以类作为参数的类模板

下面这种方法将一个Function类作为了另一个类Integral的成员，从而使得能够在Integral类中调用Function类中的成员函数。

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<cmath>

#define Pi 3.14159265

using namespace std;

class Function1
{
public:
    double fun(double x){ return sin(x); }
};

class Function2
{
public:
    double fun(double x){ return (4.0/(1.0+x*x)); }
};

template <typename Function>
class Integral
{
private:
    double left,right,step,answer;
    int num;
    Function f;
public:
    Integral(double l=0,double r=0,int n=100)
    {
		if(n<=0)
		{
			cout<<"Invalid factor! "<<endl;
			exit(0);
		}
        left=l, right=r, num=n;
        step=(right-left)/num;
        calculate();
    }
    ~Integral(){}
    void calculate();
    double get_ans(){ return answer; }
};

template <typename Function>
void Integral<Function>::calculate()
{
    answer=0;
    double l=left,r=left+step;
    for(int i=1;i<=num;i++)
    {
        answer+=((f.fun(l)+f.fun(r))*step/2.0);
        l+=step, r+=step;
    }
}

int main()
{
    Integral <Function1> Fun1 (0.0,Pi/2.0);
    Integral <Function2> Fun2 (0.0,1.0);

    cout<<"Fun1=sin(x), from 0 to Pi/2: "<<Fun1.get_ans()<<endl;
    cout<<"Fun2=4/(1+x^2), from 0 to 1: "<<Fun2.get_ans()<<endl;

    system("pause");
    return 0;
}
```

看完代码我们可以发现，其实这种方法的本质还是在类里面调用了不同的函数，只不过在函数外层还封装了一个Function类。

### 以函数作为参数的函数模板

当然，我们也可以将函数作为另一个函数模板的参数，这样相比上述代码又进一步减少了代码量，当然，在面向对象操作，需要引入private变量时，就还是只能用上面的方法。

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<cmath>

#define Pi 3.14159265

using namespace std;

double Function1(double x)
{
    return sin(x);
}

double Function2(double x)
{
    return 4.0/(1.0+x*x);
}

template <typename Function>
double Integral_Template(Function F,double left,double right,int num=100)
{
    if(num<=0)
    {
        cout<<"Invalid factor! "<<endl;
        exit(0);
    }
    double answer=0,step=(right-left)/double(num);
    double l=left,r=left+step;
    for(int i=1;i<=num;i++)
    {
        answer+=((F(l)+F(r))*step/2.0);
        l+=step, r+=step;
    }
    return answer;
}

int main()
{
    cout<<"Fun1=sin(x), from 0 to Pi/2: "<<Integral_Template(Function1,0.0,Pi/2.0)<<endl;
    cout<<"Fun2=4/(1+x^2), from 0 to 1: "<<Integral_Template(Function2,0.0,1.0)<<endl;

    system("pause");
    return 0;
}
```

### 以函数指针作为参数的函数

与上述代码类似的，我们可以用函数指针来作为参数，两者的思路非常接近。

函数指针以前不怎么用，在这里要特别注意一下函数指针的写法：`<函数返回值类型> (*p)(参数表)`，例如这里的 `double (*F)(double)` ，\*F 两边的括号是不能删去的——如果删去，就变成了 `double *F(double)`，这就变成了一个指针函数（返回值是 double 类型的指针），而且编译也过不了 qwq。

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<cmath>

#define Pi 3.14159265

using namespace std;

double Function1(double x)
{
    return sin(x);
}

double Function2(double x)
{
    return 4.0/(1.0+x*x);
}

double Integral_Pointer(double (*F)(double),double left,double right,int num=100)
{
    if(num<=0)
    {
        cout<<"Invalid factor! "<<endl;
        exit(0);
    }
    double answer=0,step=(right-left)/double(num);
    double l=left,r=left+step;
    for(int i=1;i<=num;i++)
    {
        answer+=((F(l)+F(r))*step/2.0);
        l+=step, r+=step;
    }
    return answer;
}

int main()
{
    cout<<"Fun1=sin(x), from 0 to Pi/2: "<<Integral_Pointer(Function1,0.0,Pi/2.0)<<endl;
    cout<<"Fun2=4/(1+x^2), from 0 to 1: "<<Integral_Pointer(Function2,0.0,1.0)<<endl;

    for(int i=100;i<=1000;i+=100)
        cout<<"When num="<<i<<", ans= "<<Integral_Pointer(Function1,0.0,Pi/2.0,i)<<endl;

    system("pause");
    return 0;
}
```

不过今天的代码量感觉好少呐，单个代码也就六七十行的样子，和上周的300+比起来实在是差太多啦~
