---
layout: post
title: 'Function Template 函数模板'
date: 2020-03-25
author: Wen Jian
cover: ''
tags: C++ Basic Template
---

> 此模板非彼模板

### 函数模板

所谓函数模板，就是一个函数适用于不同的数据类型，可以在不同的场景下被调用来实现类似的功能。它长这样：

``` c++
template <模板形参列表> 返回值类型 函数名 (函数形参列表)
{
	函数体
}
```

- 模板形参有两种：类型参数、常规参数
- 类型参数：由typename或class后加一个标识符构成，该标识符用在紧跟其后的函数中代表一种潜在的数据类型
- 常规参数：由类型符（如 int、float）后加一个标识符构成，该标识符用在紧跟其后的函数中代表一个潜在的常量。
- 模板形参格式：\<typename 形参名\>、\<class 形参名\>、\<数据类型 形参名\>
- 函数的返回值类型、形参类型以及函数体中，均可使用前面模板形参表中给出的**类型参数**来代表某种潜在的数据类型，该类型参数代表的具体类型只有在调用函数时根据给出的模板实参才能确定！
- 在函数体中，还可使用前面模板形参表中给出的**常规参数**来代表一个潜在的常量，该常规参数代表的具体值只有在调用函数时根据给出的模板实参才能确定！因此其对应的模板实参必须是常量表达式。

在其它部分调用函数模板时，我们一般这么写：

``` c++
函数名 <模板实参列表> (函数实参列表)
```

当根据实参能够明确确定类型、没有歧义的时候，中间的模板实参列表可以省略不写。

下面贴两道作业题，我觉得对理解函数模板很有帮助：

### Problem 1

按照下列要求编写程序：
- 定义函数模板calcu()：其中data是一个n行n列的二维数组，calcu()的功能计算每一行从1号元素到n-1号元素的总和，并将其保存到该行的0号元素中，函数返回**变化后主对角线的和**（第一次审题审错了......）。
- 定义函数模板print()：print()的功能是输出n×n的正方形矩阵data。
- 在main()函数中：定义二维数组 int a[5][5] 和 float b[4][4] 并初始化，分别调用上述两函数模板进行测试。

``` c++
#include<iostream>
#include<cstdlib>
#include<iomanip>

using namespace std;

template <typename T1,typename T2> T2 calcu(T1 *p,int line)
{
    T2 sum=0;
    for(int i=0;i<line;i++)
    {
        p[i][0]=0;
        for(int j=1;j<line;j++)
            p[i][0]+=p[i][j];
    }
    for(int i=0;i<line;i++)
        sum+=p[i][i];
    return sum;
}

template <typename T> void print(T *p,int line)
{
    for(int i=0;i<line;i++)
    {
        for(int j=0;j<line;j++)
            cout<<setw(5)<<p[i][j];
        cout<<endl;
    }
}

int main()
{
    int a[5][5]={1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25};
    double b[4][4]={1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1,2.2,2.3,2.4,2.5,2.6};

    cout<<"Original Matrix a[5][5]:"<<endl;
    print <int[5]> (a,5);
    cout<<"Original Matrix b[4][4]:"<<endl;
    print <double[4]> (b,4);

    int Sum_a;
    double Sum_b;

    Sum_a=calcu <int[5],int> (a,5);
    cout<<"Matrix a[5][5]: Sum_a="<<Sum_a<<endl;
    print <int[5]> (a,5);

    Sum_b=calcu <double[4],double> (b,4);
    cout<<"Matrix b[4][4]: Sum_b="<<Sum_b<<endl;
    print <double[4]> (b,4);

    system("pause");
    return 0;
}
```

应当注意的是，在函数模板 calcu() 中，T1指的是二维数组的行指针，T2指的是二维数组中元素的数据类型，他们并不相同。

如果对指针有些遗忘，go to [\<传送门\>](https://singularity2001.github.io/2020/02/24/Pointer-%E6%8C%87%E9%92%88.html)。

### Problem 2

编写求数组元素中最大值的函数模板，使用自定义字符串类，string类，int 等数据类型进行测试。

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<cstring>
#include<cmath>
#include<string>

#define min(a,b) ((a>b)?(b):(a))
#define max(a,b) ((a>b)?(a):(b))
#define MAXN 100
#define INF 0x3f3f3f3f

using namespace std;

class MyString
{
	//自定义字符串
};

template <typename T1,typename T2> T2 get_Max(T1 p,unsigned int Size)
{
    if(Size<=0)
    {
        cout<<"Error!"<<endl;
        exit(0);
    }
    T2 Max=p[0];
    for(unsigned int i=1;i<Size;i++)
        if(p[i]>Max)
            Max=p[i];
    return Max;
}

int main()
{
	char temp[MAXN];
	int Size;

    MyString s1;
	cout<<"Please input a string for class MyString: "<<endl;
	cin>>temp; s1=temp; Size=strlen(temp);

    cout<<get_Max <MyString,char> (s1,Size)<<endl;

	string s2;
	cout<<"Please input a string for STL class string: "<<endl;
	cin>>s2; Size=s2.length();

	cout<<get_Max <string,char> (s2,Size)<<endl;

	int Arr[MAXN];
	cout<<"Please input a set of integers for Arr: "<<endl;
	Size=0;
	while(scanf("%d",&Arr[Size++])!=EOF);

	cout<<get_Max <int[],int> (Arr,Size)<<endl;

	system("pause");
    return 0;
}
```

关于自定义字符串的内容，go to [\<传送门\>](https://singularity2001.github.io/2020/03/10/OperatorOverloading-%E9%87%8D%E8%BD%BD%E8%BF%90%E7%AE%97%E7%AC%A6.html#problem-3---my-string)

通过这一段代码，我们发现函数模板也是可以应用于对象的，当然啦，在此之前我们需要为它进行运算符重载。
