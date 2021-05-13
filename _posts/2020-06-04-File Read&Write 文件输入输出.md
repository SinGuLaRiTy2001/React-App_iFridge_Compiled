---
layout: post
title: 'File Read&Write 文件输入输出'
date: 2020-06-04
author: Wen Jian
cover: ''
tags: C++
---

> 这段时间挺忙的，又是工数月考又是磐石计划结项......正好今天下午的C++实验课是自主上机，就把这段时间讲的文件输入输出总结一下。

## Problme A - 流类库与输入/输出（1）

### Description

采用筛选法求100以内的所有素数。将所得数据存入文本文件和二进制文件。

- 对送入文本文件中的素数，要求存放格式是每行10个素数，每个数占6个字符，左对齐；可用任一文本编辑器将它打开阅读。
- 二进制文件整型数的长度请用sizeof()来获得，要求可以正序读出，也可以逆序读出（利用文件定位指针移动实现），读出数据按文本文件中的格式输出显示。

### Source Code

``` c++
#include<cstdio>
#include<iostream>
#include<fstream>
#include<cstring>
#include<cmath>

using namespace std;

#define MAXN 100

int main()
{
    int i,j;

    //Screening
    bool prime_flag[MAXN+1];
    memset(prime_flag+1,1,100);//initialize array ( 0:no_prime; 1:prime )

    for(i=3;i<=MAXN;i++)
        if(i%2==0)//If can be devided by 2, then marked with no_prime
            prime_flag[i]=0;

    for(i=3;i<=sqrt(MAXN);i+=2)
        if(prime_flag[i])
            for(j=3;i*j<=MAXN;j+=2)
                prime_flag[i*j]=0;//The multiple of i will be marked as no_prime

    //text file output module
    ofstream ofile;
    ofile.open("prime.txt");
    if(!ofile)
    {
        cout<<"Cannot open the file!"<<endl;
        system("pause");
        return 0;
    }
    int n=0;
    for(i=2;i<=MAXN;i++)
    {
        if(prime_flag[i])
        {
            ofile.setf(ios::left); ofile.width(6);
            ofile<<i;
            //ofile<<setw(6)<<left<<l;
            n++;
            if(n%10==0)
                ofile<<endl;
        }
    }
    ofile.close();

    //binary file output module
    ofile.open("prime.dat",ios::binary|ios::out);
    if(!ofile)
    {
        cout<<"Cannot open the file!"<<endl;
        system("pause");
        return 0;
    }
    for(i=2;i<=MAXN;i++)
        if(prime_flag[i])
            ofile.write((char *)(&i),sizeof(int));
    ofile.close();

    //binary file sequential print module
    cout<<"Sequential:"<<endl;
    ifstream ifile;
    ifile.open("prime.dat",ios::binary|ios::in);
    if(!ifile)
    {
        cout<<"Cannot open the file!"<<endl;
        system("pause");
        return 0;
    }
    n=0;
    int temp;
    while(true)
    {
        ifile.read((char *)(&temp),sizeof(int));
        if(ifile.eof())
            break;
        cout.setf(ios::left); cout.width(6);
        cout<<temp;
        //cout<<setw(6)<<left<<temp;
        if((++n)%10==0)
            cout<<endl;
    }
    ifile.clear();
    ifile.seekg(0);

    cout<<endl;

    //binary file reverse print module
    cout<<"Reverse:"<<endl;
    n=0;
    while(true)
    {
        ifile.read((char *)(&temp),sizeof(int));
        n++;
        if(ifile.eof())
            break;
    }//get to the end of the file 
    ifile.clear();//clear file stream
    ifile.seekg(-(sizeof(int)),ios::cur);//move backward: 1*(int) 
    for(i=1;i<n;i++)
    {
        ifile.read((char *)(&temp),sizeof(int));
        ifile.seekg(-2*(sizeof(int)),ios::cur);//move backward: 2*(int) 
        cout.setf(ios::left); cout.width(6);
        cout<<temp;
        if(i%10==0)
            cout<<endl;
    }
    ifile.close();

    cout<<endl;

    system("pause");
    return 0;
}
```

### Coding Points

- **筛选法找素数**，这个知识点比较久远，回顾一下大体的思路：对于任意一个不为1的正整数，它的倍数一定不为素数（好吧，就是素数的定义）。因此筛选法，就是将所有的倍数标记为非素数。
- `if(!ifile)`，在`ifile.open()`语句后，通过此if语句来判断程序是否成功找到/创建了目标文件。
- `ifile.open("FILENAME.dat",ios::binary|ios::out);`，其中的`ios::binary|ios::out`表示此文件以二进制形式输出。
- `ifile.read((char *)(&temp),sizeof(int));`表示从二进制文件读入，每次读入sizeof(int)个字节，就相当于是读入一个整数，并用temp来接收。
  `ofile.write((char *)(&temp),sizeof(int));`表示输出至二进制，用法与read完全相同。
- `ifile.clear()`表示清空ifile文件输入流，此语句一般在读入文件后需要再次读入前调用。
- `ifile.seekg(-(sizeof(int)),ios::cur);`表示移动文件指针。例如本语句表示将文件指针**向前**移动(sizeof(int))个字节，也就是相当于移至前一个整型数。
- `setf()` `width()`均为内置函数，用于设置输出的格式。例如下面两段代码等效：
  ``` c++
  cout.setf(left); cout.width(5);
  cout<<number;
  ```
  ``` c++
  cout<<left<<setw(5)<<number;//需要包含头文件<iomanip>
  ```

## Problem B - 流类库与输入/输出（2）

### Description

编写面向对象的程序实现以下工作：将存放在两个文本文件（data1.txt、data2.txt）中已按递增顺序排列好的两个整数序列（两个文件中的整数个数不祥，但已按递增顺序排列好），进行合并统一递增排序后写入另一个文本文件mydata.txt（按每行4个整数的格式）和二进制文件Bmydata.dat中，而原始数据文件data1.txt和data2.txt中的内容保持不变。退出程序前，输出二进制文件内容。

### Source Code

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<fstream>
#include<iomanip>

#define MAXN 100

using namespace std;

class Comb
{
private:
    int a[MAXN],b[MAXN];
    int *c;
    int a_num,b_num,c_num;
    fstream datafile;
public:
    Comb();
    ~Comb();
    void combine();
    void show();
};

Comb::Comb()
{
    a_num=0,b_num=0;
    datafile.open("data1.txt",ios::in);
    if(!datafile)
    {
        cout<<"Failed to read the file data1.txt!"<<endl;
        exit(0);
    }
    int temp;
    while(!datafile.eof())
    {
        datafile>>temp;
        if(!datafile.eof())
            a[a_num++]=temp;
    }
    datafile.clear();
    datafile.close();
    datafile.open("data2.txt",ios::in);
    if(!datafile)
    {
        cout<<"Failed to read the file data2.txt!"<<endl;
        exit(0);
    }
    while(!datafile.eof())
    {
        datafile>>temp;
        if(!datafile.eof())
            b[b_num++]=temp;
    }
    datafile.clear();
    datafile.close();
    c_num=a_num+b_num;
    c=new int [c_num];
    combine();
}

Comb::~Comb()
{
    datafile.open("mydata.txt",ios::out);
    if(!datafile)
    {
        cout<<"Failed to open the file mydata.txt!"<<endl;
        exit(0);
    }
    for(int i=0;i<c_num;i++)
    {
        datafile<<setw(6)<<c[i];
        if((i+1)%4==0)
            datafile<<endl;
    }
    datafile<<endl;
    datafile.clear();
    datafile.close();
    datafile.open("Bmydata.dat",ios::out|ios::binary);
    if(!datafile)
    {
        cout<<"Failed to open the file mydata.txt!"<<endl;
        exit(0);
    }
    for(int i=0;i<c_num;i++)
        datafile.write((char *)(&c[i]),sizeof(int));
    datafile.close();
    delete [] c;
}

void Comb::combine()
{
    int a_pos=0,b_pos=0,c_pos=0;
    while(a_pos<a_num&&b_pos<b_num)
    {
        if(a[a_pos]<b[b_pos])
            c[c_pos++]=a[a_pos++];
        else
            c[c_pos++]=b[b_pos++];
    }
    while(a_pos<a_num)
        c[c_pos++]=a[a_pos++];
    while(b_pos<b_num)
        c[c_pos++]=b[b_pos++];
}

void Comb::show()
{
    cout<<"Array a[]:"<<endl;
    for(int i=0;i<a_num;i++)
    {
        cout<<setw(6)<<a[i];
        if((i+1)%4==0)
            cout<<endl;
    }
    cout<<endl;
    cout<<"Array b[]:"<<endl;
    for(int j=0;j<b_num;j++)
    {
        cout<<setw(6)<<b[j];
        if((j+1)%4==0)
            cout<<endl;
    }
    cout<<endl;
    cout<<"Array c[]:"<<endl;
    for(int k=0;k<c_num;k++)
    {
        cout<<setw(6)<<c[k];
        if((k+1)%4==0)
            cout<<endl;
    }
    cout<<endl;
}

int main()
{
    Comb TEST;
    cout<<"Test result:"<<endl;
    TEST.show();
    system("pause");
    return 0;
}
```

### Coding Points

上述代码包含的知识点与 Problem A 大致相似，因此就不再赘述了。