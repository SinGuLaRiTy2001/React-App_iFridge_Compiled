---
layout: post
title: 'Class Inheritance 类继承-工资管理&定积分求解'
date: 2020-05-21
author: Wen Jian
cover: ''
tags: C++ Class&Object
---

> 尝试上手 MathJax 公式编辑的第一天~ 辛普生那个公式我打了十几分钟qwq......

## Problem 1 工资管理

### Description

某公司雇员（employee）包括经理（manager），技术人员（technician）和销售员（salesman）。开发部经理（developermanger），既是经理也是技术人员。销售部经理（salesmanager），既是经理也是销售员。

- 以employ类为虚基类派生出manager，technician和salesman类；再进一步派生出developermanager和salesmanager类。
- employee类的属性包括姓名、职工号、工资级别，月薪（实发基本工资加业绩工资）。操作包括月薪计算函数（pay()），该函数要求输入请假天数，扣去应扣工资后，得出实发基本工资。
- technician类派生的属性有每小时附加酬金和当月工作时数，及研究完成进度系数。业绩工资为三者之积。也包括同名的pay()函数，工资总额为基本工资加业绩工资。
- salesman类派生的属性有当月销售额和酬金提取百分比，业绩工资为两者之积。也包括同名的pay()函数，工资总额为基本工资加业绩工资。
- manager类派生属性有固定奖金额和业绩系数，业绩工资为两者之积。工资总额也为基本工资加业绩工资。
- developermanager类，pay()函数是将作为经理和作为技术人员业绩工资之和的一半作为业绩工资。
- salesamanager类，pay()函数则是经理的固定奖金额的一半，加上部门总销售额与提成比例之积，这是业绩工资。

编程实现工资管理。特别注意pay()的定义和调用方法：先用同名覆盖，再用运行时多态。

### Source Code

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<cstring>

using namespace std;

#define Basic 5000//»ù±¾¹¤×Ê
#define Fine 100//Çë¼Ùµ¥ÈÕ·£¿î½ð¶î
#define Hour_Bonus 50//Ã¿Ð¡Ê±¸½¼Ó³ê½ð
#define Sales_Rate 0.5//³ê½ðÌáÈ¡°Ù·Ö±È
#define Fixed_Bonus 3000//¹Ì¶¨½±½ð¶î

class employee
{
protected: 
    char name[20];
    int number;
    int level;
    double salary;
public:
    employee(char* na,int n=-1,int l=-1)
    {
        strcpy(name,na);
        number=n, level=l, salary=Basic;
    }
    virtual void pay()
    {
        int ndays;
        cout<<"Please input leave days: "<<endl;
        cin>>ndays;
        salary-=ndays*Fine;
    }
    void show()
    {
        cout<<"name: "<<name<<'\t'<<"number: "<<number<<'\t'<<"level: "<<level<<endl;
        cout<<"salary: "<<salary<<endl;
    }
};

class technician : virtual public employee
{
protected:
    double hour_bonus;
    int month_hours;
    double develop_rate;
public:
    technician(char* na,int n=-1,int l=-1,int m_h=0,double d_r=0):employee(na,n,l)
    {
        hour_bonus=Hour_Bonus, month_hours=m_h, develop_rate=d_r;
    }
    void pay()
    {
		employee::pay();
        salary+=hour_bonus*month_hours*develop_rate;
    }
};

class salesman : virtual public employee
{
protected:
    double month_sales;
    double sales_rate;
public:
    salesman(char* na,int n=-1,int l=-1,double m_s=0):employee(na,n,l)
    {
        month_sales=m_s, sales_rate=Sales_Rate;
    }
    void pay()
    {
		employee::pay();
        salary+=month_sales*sales_rate;
    }
};

class manager : virtual public employee
{
protected:
    double fixed_bonus;
    double perform_rate;
public:
    manager(char* na,int n=-1,int l=-1,double p_r=0):employee(na,n,l)
    {
        perform_rate=p_r, fixed_bonus=Fixed_Bonus;
    }
    void pay()
    {
		employee::pay();
        salary+=fixed_bonus*perform_rate;
    }
}; 

class developermanager : virtual public employee, public technician, public manager
{
public:
    developermanager(char* na,int n=-1,int l=-1,int m_h=0,double d_r=0,double p_r=0):employee(na,n,l),technician(na,n,l,m_h,d_r),manager(na,n,l,p_r){ }
    void pay()
    {
		employee::pay();
        salary+=((hour_bonus*month_hours*develop_rate+fixed_bonus*perform_rate)/2);
    }
};

class salesmanager : virtual public employee, public salesman, public manager
{
public:
    salesmanager(char* na,int n=-1,int l=-1,double m_s=0,double p_r=0):employee(na,n,l),salesman(na,n,l,m_s),manager(na,n,l,p_r){ }
    void pay()
    {
		employee::pay();
        salary+=(month_sales*sales_rate+fixed_bonus/2);
    }
};

int main()
{
    employee *p;

    technician t((char*)"Sandy",1001,1,100,0.8);
    p=&t; p->pay(); p->show();

    salesman s((char*)"Mark",1002,1,5000);
    p=&s; p->pay(); p->show();

    manager m((char*)"Jack",1003,2,0.6);
    p=&m; p->pay(); p->show();

    developermanager dm((char*)"Frances",1004,3,100,0.8,0.6);
    p=&dm; p->pay(); p->show();

    salesmanager sm((char*)"Selina",1005,4,5000,0.6);
    p=&sm; p->pay(); p->show();

    system("pause");
    return 0;
}
```

### Coding point

- 子类的构造函数要特别注意，千万不要忘记同时对基类进行构造。
- 我们可以发现子类与基类的同名函数（例如 pay() ），有不同的调用方法，在调用时要格外注意。
- 对于子类 developermanager 与 salesmanmanager ，为了避免与 salesman/developer 、 manager 的成员函数 pay() 重复引起歧义，因此并没有像 employee 那样采用虚拟继承。
- `ISO C++ forbids converting a string constant to 'char*' [-Wwrite-strings]` ，这是上述代码在编译时产生的 warning ，留坑~

## Problem 2 定积分求解

### Description

辛普生法（simpson）积分近似计算公式（n为偶数）为：

$\int_a^b{fxdx}\approx\frac{\Delta x}{3}[y_0+y_n+4(y_1+y_3+...+y_{n-1})+2(y_2+y_4+...+y_{n-2})]$

被积函数用派生类引入，被积函数定义为纯虚函数。

基类（integer）成员数据包括：积分上下限b和a；分区数n；步长step=(b-a)/n，积分值result。定义积分函数integerate()为虚函数，它只显示提示信息。

派生的矩形法类（rectangle）重定义integerate()，采用矩形法作积分运算。派生的梯形法类（ladder）和辛普生法（simpson）类似。

请编程，用辛普生法对下列被积函数

- sin(x) ，下限为0.0和上限为π/2。
- 4.0/(1+x*x) ，下限为0.0和上限为1.0。

进行定积分计算，并比较积分精度。

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<cmath>

using namespace std;

#define Pi 3.1415926535898
#define MAXN 1000

class integer
{
protected:
    double lower,upper,step,result;
    int num;
public:
    integer(double l=0,double u=0,int n=MAXN)
    {
        num=n;
		lower=l, upper=u;
		step=(u-l)/n;
        if(step<=0)
        {
            cout<<"Invalid step value!"<<endl;
            exit(0);
        }
    }
    virtual void integrate()
    {
        cout<<"This is integrate() in the basic class."<<endl;
    }
};

class Simpson : virtual public integer
{
protected:
    double (*fun)(double);
public:
    Simpson(double (*f)(double),double l=0,double u=0,int n=MAXN):integer(l,u,n)
    { 
        fun=f;
    }
    //virtual double fun(double x)=0;
    void integrate()
    {
        result=fun(lower)+fun(upper);
        for(int i=1;i<=num;i+=2)
            result+=(4*fun(lower+step*i));
        for(int j=2;j<=num;j+=2)
            result+=(2*fun(lower+step*j));
        result*=(step/3);
    }
    void print_result()
    {
        cout<<"[Simpson] The definite result is: "<<result<<endl;
    }
};

class Ladder : virtual public integer
{
protected:
    double (*fun)(double);
public:
    Ladder(double (*f)(double),double l=0,double u=0,int n=MAXN):integer(l,u,n)
    {
        fun=f;
    }
    //virtual double fun(double x)=0;
    void integrate()
    {
        result=0;
        double l=lower,r=lower+step;
        for(int i=1;i<=num;i++)
        {
            result+=((fun(l)+fun(r))*step/2.0);
            l+=step, r+=step;
        }
    }
    void print_result()
    {
        cout<<"[Ladder] The definite result is: "<<result<<endl; 
    }
};

class Rectangle : virtual public integer
{
protected:
    double (*fun)(double);
public:
    Rectangle(double (*f)(double),double l=0,double u=0,int n=MAXN):integer(l,u,n)
    {
        fun=f;
    }
    //virtual double fun(double x)=0;
    void integrate()
    {
        result=0;
        double now_x=lower;
        for(int i=1;i<=num;i++)
        {
            result+=(fun(now_x)*step);
            now_x+=step;
        }
    }
    void print_result()
    {
        cout<<"[Rectangle] The definite result is: "<<result<<endl; 
    }
};

double Function1(double x)
{
    return sin(x);
}

double Function2(double x)
{
    return (4.0/(1.0+x*x));
}

int main()
{
	integer *sim_1,*sim_2,
            *lad_1,*lad_2,
            *rec_1,*rec_2;
    
    Simpson s1(Function1,0.0,Pi/2); sim_1=&s1; sim_1->integrate(); s1.print_result();
    Simpson s2(Function2,0.0,1.0); sim_2=&s2; sim_2->integrate(); s2.print_result();

    Ladder l1(Function1,0.0,Pi/2); lad_1=&l1; lad_1->integrate(); l1.print_result();
    Ladder l2(Function2,0.0,1.0); lad_2=&l2; lad_2->integrate(); l2.print_result();

    Rectangle r1(Function1,0.0,Pi/2); rec_1=&r1; rec_1->integrate(); r1.print_result();
    Rectangle r2(Function2,0.0,1.0); rec_2=&r2; rec_2->integrate(); r2.print_result();

    system("pause");
    return 0;
}
```

### Coding point

- 为了使 Ladder 、 Rectangle 、 Simpson 都能够调用两种 Function ，在这里我使用了函数指针作为它们的数据成员，进一步提高了代码的可重用性。
