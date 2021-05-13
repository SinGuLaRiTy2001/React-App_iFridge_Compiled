---
layout: post
title: 'Class Inheritance 类继承-点类'
date: 2020-05-17
author: Wen Jian
cover: ''
tags: C++ Class&Object
---

> 进入知识盲区——

## Problem 1 

### Description

以点（point）类为基类，重新定义矩形类和圆类。

- 点为直角坐标点，矩形水平放置，由左下方的顶点和长宽定义。
- 圆由圆心和半径定义。
- 派生类操作判断任一坐标点是在图形内，还是在图形的边缘上，还是在图形外。
- 缺省初始化图形退化为点。
- 要求包括拷贝构造函数、重载的复制赋值操作符。

编程测试类设计是否正确。

### Source Code

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>

using namespace std;

class point
{
protected:
    double x,y;
public:
    point(double a=0,double b=0) 
    { 
        x=a, y=b; 
    }
    point(point &p)
    {
        x=p.x, y=p.y;
    }
    point & operator = (point &p)
    {
        x=p.x, y=p.y;
        return *this;
    }
};

class rectangle : public point
{
private:
    double width,height;
public:
    rectangle(double a=0,double b=0,double w=0,double h=0):point(a,b)
    {  
        width=w, height=h;
    }
    rectangle(rectangle &rec):point(rec)
    {
        width=rec.width, height=rec.height;
    }
    rectangle & operator = (rectangle &rec)
    {
        this->point::operator=(rec);
        width=rec.width, height=rec.height;
        return *this;
    }
    void is_included(point &p)
    {
        double px=p.getx(), py=p.gety();
        if(px<x||px>x+width||py<y||py>y+height)
            cout<<"The point is OUT OF rectangle."<<endl;
        else if(px>x&&px<x+width&&py>y&&py<y+height)
            cout<<"The point is IN the rectangle."<<endl;
        else
            cout<<"The point is ON THE EDGE of the rectangle."<<endl;
    }
};

class circle : public point
{
private:
    double radius;
public:
    circle(double a=0,double b=0,double r=0):point(a,b)
    {  
        radius=r;
    }
    circle(circle &cir):point(cir)
    {
        radius=cir.radius;
    }
    circle & operator = (circle &cir)
    {
        this->point::operator=(cir);
        radius=cir.radius;
        return *this;
    }
    void is_included(point &p)
    {
        double px=p.getx(), py=p.gety();
        if((px-x)*(px-x)+(py-y)*(py-y)>radius*radius)
            cout<<"The point is OUT OF the circle."<<endl;
        else if((px-x)*(px-x)+(py-y)*(py-y)<radius*radius)
            cout<<"The point is IN the circle."<<endl;
        else 
            cout<<"The point is ON THE EDGE OF the circle."<<endl;
    }
};

int main()
{
    rectangle rec_a(1,2,5,5);
    point p_a(1,4); rec_a.is_included(p_a);// On
    rectangle rec_b=rec_a;
    point p_b(10,-5); rec_b.is_included(p_b);// Out of
    rectangle rec_c(rec_a);
    point p_c(2,4); rec_c.is_included(p_c);// In

    circle cir_d(1,2,3);
    point p_d(p_a); cir_d.is_included(p_d);// In
    circle cir_e=cir_d;
    point p_e=p_b; cir_e.is_included(p_e);// Out of
    circle cir_f(cir_d);
    point p_f(-2,2); cir_f.is_included(p_f);// On

    system("pause");
    return 0;
}
```

### Coding point

- 在类继承中，如果有子类需要频繁使用基类中某些成员数据的情况，例如这里 point 类中的 x 和 y ，我们就可以将这些数据设为 protected 类型。这样程序既可以省略 getx() 这样的接口函数，也仍旧可以确保数据的密封性。
- is_included() 这类成员函数应该避免使用 void 类型，成员函数通常需要**返回状态值**至调用者。
