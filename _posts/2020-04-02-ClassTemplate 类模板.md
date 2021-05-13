---
layout: post
title: 'Class Template 类模板'
date: 2020-04-02
author: Wen Jian
cover: ''
tags: C++ Class&Object Template
---

> 更长的代码来啦！话不多说，上代码~

### Problem 1

#### 实验目的

- 掌握类模板的定义。
- 掌握类模板的实例化。
- 掌握插入排序法——直接插入
- 掌握插入排序法——折半插入
- 掌握冒泡排序法

#### 实验内容

1. 建立一个顺序表类模板，自行封装数据成员，成员函数。
2. 在顺序表中，再添加如下成员函数实现降序排序。
void InsertSort(): 直接插入排序算法，
void BinarySort(): 对半插入排序算法，
void BubbleSort(): 冒泡排序算法；
3. 添加归并函数 void Merge() 实现：将两个已升序排好的数组，合并为一个升序排序的数组（归并）。
4. 在main函数中，用string类型、int类型或自定义数据类型进行测试。(经历了上周作业审题错误的惨痛教训，我肯定这周的string一定指的是字符串数组 string\[\] ！)

``` c++
#include<iostream>
#include<cstdio>
#include<cstdlib>
#include<string>
#include<cstring>

#define MAXN 100

using namespace std;

template <typename T1,typename T2,int n>
class seqlist
{
private:
    T1 arr[n];
    int Size,Last;
public:
    seqlist(){ Size=n, Last=-1; }                      //Constructor
    ~seqlist() {}                                      //Destructor
    seqlist(T2 *p,int cnt);                             //Pointer Constructor
    bool Is_empty() const{ return (Last==-1); }        //Is_empty
    bool Is_full() const{ return (Last==Size-1); }     //Is_full
    int Get_len() const{ return Last+1; }              //Get length
    int Find(T1 &a);                                   //Find element
    bool Insert(T1 &a,int add);                        //Insert
    bool Delete(T1 &a);                                //Delete
    int Next(T1 &a);                                   //Get the next
    int Post(T1 &a);                                   //Get the post
    T1 & operator [] (int add);                        //Operator [] overload            =
    void Print();                                      //Print arr                       =
    void Merge(T2 arr1,int m1,T2 arr2,int m2);         //Combine two sorted lists
    void Bubblesort();
    void Insertsort();
    void Binarysort();
};

template <typename T1,typename T2,int n>
seqlist<T1,T2,n>::seqlist(T2 *p,int cnt)
{
    Size=n;
    if(cnt>Size)
    {
        cout<<"Error: Array exceeded! "<<endl;
        exit(0);
    }
    for(int i=0;i<cnt;i++)
        arr[i]=p[i];
    Last=cnt-1;
}

template <typename T1,typename T2,int n>
int seqlist<T1,T2,n>::Find(T1 &a)
{
    for(int i=0;i<=Last;i++)
        if(arr[i]==a)
            return i;
    return -1;
}

template <typename T1,typename T2,int n>
bool seqlist<T1,T2,n>::Insert(T1 &a,int add)
{
    if(Is_full())
    {
        cout<<"Error: The seqlist is full! Insert failed! "<<endl;
        return false;
    }
    if(add<0||add>=Size)
    {
        cout<<"Error: Wrong address! "<<endl;
        return false;
    }
    if(add>Last)
    {
        arr[++Last]=a;
        return true;
    }
    Last+=1;
    for(int i=Last;i>add;i--)
        arr[i]=arr[i-1];
    arr[add]=a;
    return true;
}

template <typename T1,typename T2,int n>
bool seqlist<T1,T2,n>::Delete(T1 &a)
{
    bool flag=false;
    for(int i=0;i<=Last;i++)
        if(arr[i]==a)
        {
            flag=true;
            for(int j=i;j<Last;j++)
                arr[j]=arr[j+1];
            Last--;
        }
    return flag;
}

template <typename T1,typename T2,int n>
int seqlist<T1,T2,n>::Next(T1 &a)
{
    int pos=Find(a);
    if(pos==-1||pos==Last)
    {
        cout<<"Error: Address not found! "<<endl;
        return -1;
    }
    return pos+1;
}

template <typename T1,typename T2,int n>
int seqlist<T1,T2,n>::Post(T1 &a)
{
    int pos=Find(a);
    if(pos==-1||pos==0)
    {
        cout<<"Error: Address not found! "<<endl;
        return -1;
    }
    return pos-1;
}

template <typename T1,typename T2,int n>
T1 & seqlist<T1,T2,n>::operator [] (int add)
{
    if(add<0||add>Last)
    {
        cout<<"Error: Array exceeded! "<<endl;
        exit(1);
    }
    return arr[add];
}

template <typename T1,typename T2,int n>
void seqlist<T1,T2,n>::Print()
{
    for(int i=0;i<=Last;i++)
        cout<<arr[i]<<" ";
    cout<<endl;
}

template <typename T1,typename T2,int n>
void seqlist<T1,T2,n>::Merge(T2 arr1,int m1,T2 arr2,int m2)
{
    if(m1<0||m2<0)
    {
        cout<<"Error! "<<endl;
        return ;
    }
    if(m1==1&&m2==0)
    {
        arr[0]=arr1[0];
        return ;
    }
    if(m1==0&&m2==1)
    {
        arr[0]=arr2[0];
        return ;
    }
    Last=m1+m2-1;
    int add1=0,add2=0;
    for(int i=0;i<Last;i++)
    {
        bool flag=(arr1[add1]>arr2[add2]);
        arr[i]=flag?arr2[add2]:arr1[add1];
        if(flag)
        {
            add2++;
            if(add2==m2)
            {
                for(int j=add1;j<m1;j++)
                    arr[++i]=arr1[j];
                break;
            }
        }
        else
        {
            add1++;
            if(add1==m1)
            {
                for(int j=add2;j<m2;j++)
                    arr[++i]=arr2[j];
                break;
            }
        }
    }
}

template <typename T1,typename T2,int n>
void seqlist<T1,T2,n>::Bubblesort()
{
    int cnt=Get_len();
    for(int i=0;i<cnt;i++)
        for(int j=0;j<cnt-i-1;j++)
                if(arr[j]>arr[j+1])
                {
                    T1 temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
}

template <typename T1,typename T2,int n>
void seqlist<T1,T2,n>::Binarysort()
{
    int cnt=Get_len(),low,high,mid;
    for(int i=1;i<cnt;i++)
    {
        low=0, high=i-1;
        while(low<=high)
        {
            mid=(low+high)/2;
            if(arr[mid]>arr[i])
                high=mid-1;
            else
                low=mid+1;
        }
        T1 temp=arr[i];
        int j;
        for(j=i-1;j>high;j--)
            arr[j+1]=arr[j];
        arr[j+1]=temp;
    }
}

template <typename T1,typename T2,int n>
void seqlist<T1,T2,n>::Insertsort()
{
    int cnt=Get_len();
    for(int i=1;i<cnt;++i)
    {
        int j=i;
        while(j>=1&&arr[j]<arr[j-1])
        {
            T1 temp=arr[j];
            arr[j]=arr[j-1];
            arr[j-1]=temp;
            j--;
        }
    }
}

class Test
{
private:
    int number;
public:
    Test(int n=0) { number=n; }
    ~Test() {}
    bool operator < (Test &n2){ return number<n2.number; }
    bool operator > (Test &n2){ return number>n2.number; }
    bool operator <= (Test &n2){ return number<=n2.number; }
    bool operator >= (Test &n2){ return number>=n2.number; }
    bool operator == (Test &n2){ return number==n2.number; }
    Test operator + (Test &n2){ return number+n2.number; }
    Test operator - (Test &n2){ return number-n2.number; }
    friend ostream & operator << (ostream &output, Test &a)
    {
        output<<a.number;
        return output;
    }
};

int main()
{
    int A[10]={8,5,2,7,4,3,1,9,6,10};
    string S[5]={"evfahwosinzt","qybmxrugos","ybmxrugoevfa","mxrugosinzt","fahwcqyb"};
    Test N[10];
    for(int i=0;i<10;i++)
        N[i]=A[i];

    seqlist <int,int,MAXN> Integers(A,10);
    seqlist <string,string,MAXN> String(S,5);
    seqlist <Test,Test,MAXN> Numbers(N,10);

    cout<<"Integers: "; Integers.Print();
    cout<<"String: "; String.Print();
    cout<<"Numbers: "; Numbers.Print();

    cout<<Numbers.Post(Numbers[3])<<endl;
    cout<<String.Next(String[2])<<endl;

    int int_temp=11;
    Integers.Insert(int_temp,5);
    Integers.Print();

    string char_temp="qybmxrugos";
    String.Delete(char_temp);
    String.Print();

    Test Test_temp(6);
    cout<<Numbers.Find(Test_temp)<<endl;

    String.Binarysort();
    String.Print();

    Numbers.Bubblesort();
    Numbers.Print();

    Integers.Insertsort();
    Integers.Print();

    string S1="abcdefghijklmnopqrstuvwxyz";
    string S2="123456789";
    seqlist <char,string,MAXN> String3;
    String3.Merge(S1,S1.length(),S2,S2.length());
    String3.Print();

    system("pause");
    return 0;
}
```

模板很重要的一点就是设置 typename ，例如对于一个的 string 来说，它整体是 string 类型，单个元素是 char 类型；对于一个 int 数组，它整体是 int\[\] 类型，单个元素是 int 类型，这些时候就可能要设置两个参数。

例如对于一个 `string s="I Like Selina."`，如果这样构造顺序表： 
``` c++
seqlist <string,string,MAXN> S(s,14);
```
编译器就会报错——在构造函数 seqlist<T1,T2,n>::seqlist(T2 \*p,int cnt) 中，不存在 string \*p 这种用法；但是对于的字符串数组 string s[] ，采取这样的构造方法就是可以的，因为这样一来 string \*p 就成为了一个指向某个字符串的指针。

那么怎样才能构造  `string s="I Like Selina."` 的顺序表呢？ 我们不妨将 T1、T2 分别代入进类里面，看看它们在什么样的位置，表示了哪些成员、返回值、参数的类型。在这里，我们发现要构造这样的顺序表，那么成员数组 arr 需要为 char 类型，因为这样 arr\[i\] 才会代表单个 string 里面的单个元素；我们再看到，如果T2为 string ，那么在构造函数 seqlist<T1,T2,n>::seqlist(T2 \*p,int cnt) 中同样会出现 string \*p 的错误，这时我们就必须要将构造函数改变为 seqlist<T1,T2,n>::seqlist(T2 p,int cnt) ，这样就可以顺利通过编译了。

其实上述关于 string 的问题，根源在于 string 类定义的字符串 s 不能像一维字符数组那样用 `string *p=s;` 或 `char *p=s;` 来设置指针。这一类问题在写关于 string 的类模板函数时要注意规避。

另外，本次代码包含了 Merge() 、 BinarySort() 、 InsertSort() 等对数组/顺序表的操作函数，里面的下标变化相对复杂，一个小偏差可能会造成雪崩式影响，因此可能需要多考虑循环的边界条件、加减1等细节问题，还可以通过“画格子”等方式来思考。 