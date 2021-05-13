---
layout: post
title: 'Linked List & Class Template 链表遇到类模板'
date: 2020-04-30
author: Wen Jian
cover: ''
tags: C++ Class&Object Pointer Template 
---

> 这次的代码是真的长......而且是在类里面嵌套一个类，再在嵌套的类里面嵌套一个类......没错，就是套娃。

## Problem 学生资料管理

1. 封装单链表类模板 List；
2. 封装结点类模板Node；
3. 在文件 studata.txt 中，有若干学生成绩资料。
   封装 student 类作为结点的数据类类型，对单链表类模板 List 中的各成员函数进行测试。（student数据成员采用：int，string，int 类型）
4. 完善测试程序。(测试程序就是给出的 main 函数，就不单独放上来了)

### Code

``` c++
#include<iostream>
#include<fstream>
#include<cstdio>
#include<cstdlib>
#include<string>

using namespace std;

template<typename T>class List;

class student
{
private:
    int ID,score;
    string name;
public:
    student()
    {
        ID=-1,score=-1;
        name="NONE";
    }
    bool operator > (student b)
    {
        if(score>b.score) return true;
        else return false;
    }
    bool operator < (student b)
    {
        if(score<b.score) return true;
        else return false;
    }
    bool operator == (student b)
    {
        if(score==b.score) return true;
        else return false;
    }
    student & operator = (student b)
    {
        ID=b.ID;
        score=b.score;
        name=b.name;
        return *this;
    }
    friend istream & operator >> (istream &input,student &s)
    {
        input>>s.ID>>s.name>>s.score;
        return input;
    }
    friend ostream & operator << (ostream &output,student &s)
    {
        output<<s.ID<<' '<<s.name<<' '<<s.score;
        return output;
    }
    bool equal_by_ID(const student &s)
    {
        if(ID==s.ID) return true;
        else return false;
    }
	void putkey(int new_ID)
	{
		ID=new_ID;
	}
};

template <typename T>
class Node
{
private:
    T info;
    Node <T> *next;
public:
    Node(){ next=NULL; }
    bool operator > (Node <T> p2)
    {
        if(info>p2.info) return true;
        else return false;
    }
    bool operator < (Node <T> p2)
    {
        if(info<p2.info) return true;
        else return false;
    }
    bool operator == (Node <T> p2)
    {
        if(info==p2.info) return true;
        else return false;
    }
	friend class List <T>;
};

template <typename T>
class List
{
private:
    Node <T> *head;
public:
    List(){ head=new Node <T>; }
    List(List &l)
    {
		if(head=new Node <T>) ;
        else
        {
            cout<<"Allocation failed."<<endl;
            exit(1);
        }
        Node <T> *p=l.head,*new_p,*pos_p=head;
        while(p->next)
        {
			p=p->next;
            if(new_p=new Node <T>) ;
            else
            {
                cout<<"Allocation failed."<<endl;
                exit(1);
            }
            new_p->info=p->info;
            new_p->next=NULL;
            pos_p->next=new_p;
            pos_p=new_p;
        }
    }
	List operator = (const List &l)
	{
		Node <T> *p=l.head,*new_p,*pos_p=head;
        while(p->next)
        {
			p=p->next;
            if(new_p=new Node <T>) ;
            else
            {
                cout<<"Allocation failed."<<endl;
                exit(1);
            }
            new_p->info=p->info;
            new_p->next=NULL;
            pos_p->next=new_p;
            pos_p=new_p;
        }
		return *this;
	}
    ~List()
    {
        MakeEmpty();
        if(head)
            delete head;
    }
    Node <T> *CreateNode(const T &element)
    {
        Node <T> *p;
        if(p=new Node <T>) ;
        else
        {
            cout<<"Allocation failed."<<endl;
            exit(1);
        }
        p->info=element;
        p->next=NULL;
        return p;
    }
    void InsertFront(Node <T> *element)
    {
        element->next=head->next;
        head->next=element;
    }
    void InsertRear(Node <T> *element)
    {
        Node <T> *p=head;
        while(p->next)
            p=p->next;
        p->next=element;
        element->next=NULL;
    }
    void PrintList()
    {
        Node <T> *p=head->next;
        while(p)
        {
            cout<<p->info<<endl;
            p=p->next;
        }
    }
    Node <T> *Find(const student &s)
    {
        Node <T> *p=head->next;
        while(p)
        {
            if((p->info).equal_by_ID(s)==true)
                return p;
            p=p->next;
        }
        return 0;
    }
    Node <T> *DeleteNode(Node <T> *target)
    {
        Node <T> *p=head->next,*post_p=head;
        while(p)
        {
            if(target==p)
            {
                post_p->next=p->next;
                break;
            }
			post_p=p;
            p=p->next;
        }
        return p;
    }
    int Length()
    {
        Node <T> *p=head->next;
        int len=0;
        while(p)
        {
            len++;
            p=p->next;
        }
        return len;
    }
    void MakeEmpty()
    {
        Node <T> *p=head->next,*after_p;
        while(p)
        {
            after_p=p->next;
            delete p;
            p=after_p;
        }
        head->next=NULL;
    }
    void InsertOrder(Node <T> *element)//descend
    {
        if(head->next==NULL)
        {
            head->next=element;
            element->next=NULL;
            return ;
        }
        if(element->info>head->next->info)
        {
            element->next=head->next;
            head->next=element;
            return ;
        }
        Node <T> *p=head->next,*after_p;
        while(p)
        {
            after_p=p->next;
            if(p->info>element->info&&(after_p==NULL||element->info>after_p->info))
            {
                element->next=after_p;
                p->next=element;
                break;
            }
			p=p->next;
        }
    }
    Node <T> *reverse_pointer(Node <T> *p,Node <T> *after_p)
    {
        static Node <T> *tail;
        if(after_p->next)
            tail=reverse_pointer(after_p,after_p->next);
        else
            tail=after_p;
        after_p->next=p;
        return tail;
    }
    void Reverse()
    {
        Node <T> *p=head->next,*after_p;
        if(Length()<=1)
            return ;
        after_p=p->next;
        head->next=reverse_pointer(p,after_p);
        p->next=NULL;
    }
};

int  main()
{
    student st;
    Node <student> *pnode;
    List <student> list1;
	List <student> list2;

    ifstream ifile;
    ifile.open("studata.txt");

    while(!ifile.eof())
    {
        ifile>>st;
		if(!ifile)
			break;
        //读入文件中数据建立链表list1，list2;
        pnode=list1.CreateNode(st);
	    list1.InsertFront(pnode);

        pnode=list2.CreateNode(st);
	    list2.InsertRear(pnode);
		if(ifile.fail()) break;
    }

    //list1，list2 建立成功，输出查看。
    list1.PrintList();
    list2.PrintList();

    cout<<"用list1构建list3"<<endl;
    List <student> list3(list1);
    //拷贝构造函数先建立一个头结点，再以原链表的各结点的数据域来构造新链表的各对应结点。

    list3.PrintList();

    cout<<"请输入删除结点的学号："<<endl;
    int number;
    cin>>number;
    st.putkey(number);
    pnode=list1.Find(st);

    if(pnode)
    {
        pnode=list1.DeleteNode(pnode);
	    delete pnode;
	    list1.PrintList();
	    cout<<"list1 长度："<<list1.Length()<<endl;
    }
    else
        cout<<"未找到!\n";

    cout<<"清空list1，按分数从大到小的顺序重建list1"<<endl;
    list1.MakeEmpty();

    ifile.clear();
    ifile.seekg(0);

    //读入文件数据，重建list1
	while(!ifile.eof())
	{
		ifile>>st;
		if(!ifile)
			break;
		pnode=list1.CreateNode(st);
		list1.InsertOrder(pnode);
	}

    list1.PrintList();

    cout<<"将链表list1逆序"<<endl;
	//要求不删除原结点，也不另建一个链表来取代，
	//而是通过改变指针域的链接方向来逆转链表。

    list1.Reverse();
    list1.PrintList();

    cout<<"用list3赋值给list1"<<endl;
    list1=list3;
    list1.PrintList();
    ifile.close();

    system("pause");
    return 0;
}
```

### Code Points

- 在程序开始时**必须要先声明 List** ： `template<typename T>class List;` ，因为在 Node 中使用了 `friend class List <T>;` ，这样就可以在 List 之中直接访问 Node 的 private 成员数据，简化程序；
- 关于 string 类，声明 string 类型字符串时无需注明长度；另外赋值**不能使用 strcpy ，而是直接使用 =** 或类成员函数 assign() 。 再次提醒注意区分 \<string\> 和 \<cstring\> 这两种库函数；
- 因为使用了类模板，因此在每一次使用 Node 时都需要加上 "\<T\>" ，包括函数的返回值类型、申请动态内存空间等各种情况；
- 复习一下从文件读入、输出：
  ``` c++
  #include<fstream>
  ...
  ifstream ifile;
  ifile.open("input.txt");
  ifile>>data_in;
  ifile.close();

  ofstream ofile;
  ofile.open("output.txt");
  ofile<<data.out;
  ofile.close();
  ...
  ```
  另外，代码 main 函数中的 `ifile.clear(); ifile.seekg(0);` 表示对ifile指向的文件进行重定位，此后再次从该文件读入时将从头开始读入；
- 从外部文件读入判断读入结束时，我们通常使用 eof 来判断，但是这里实际上**是有个大坑**的！！！在测试代码时，我发现文件**最后一组数据被读入了两次！**在网上搜了一下，原来是在读取文件时，使用 eof() 判断 EOF 会重复读取两次，导致重复最后一组数据。于是我采取了 <a href="https://blog.csdn.net/Kai_gai/article/details/7537567?utm_medium=distribute.pc_relevant.none-task-blog-OPENSEARCH-4&depth_1-utm_source=distribute.pc_relevant.none-task-blog-OPENSEARCH-4" target="_blank">Kai_gai的解决方案</a> ，在每次读入后通过 `if(!ifile)` 判断读入是否失败，如果为失败（已经读到 EOF ）就直接结束读入，避免二次读入。另外还有一种方式能优雅地解决这个问题，那就是用 `ifile.peek()` 替换 `ifile.eof()` 。 peek() 这个函数很特别，它的作用就是“看一下”下一个字符是什么，同时又不会读入到流中，这样一来，如果发现文件指针即将读到 EOF ，我们就可以提前结束读入。
- 复习一下运算符重载：
  ``` c++
  <function type> operator <operator> (parameter list) { }
  ```
- 关于最最最复杂的 List 类，我倒觉得没什么特别需要说的，因为感觉链表这个东西其实也不是很复杂，就是指针的转换更灵活，熟悉了就会好很多：
  - 需要注意在 List 的成员数据中 head 仅仅是一个指针，因此在初始化链表时需要为 head 分配内存空间，否则会出现 Access Violation；
  - `Node <T> *DeleteNode(Node <T> *target)` 中的 `if(target==p)`，这里是通过判断两个指针指向的地址是否相同来判断是否为同一节点；还有一点，就是一定**不要漏掉指针的转移，还要注意指针的赋值顺序**（否则就会在几天后检查代码时流下悔恨的泪水qwq）；
  - `MakeEmpty()` 中需要 after_p 指针用于节点转移。个人还是觉得递归更简洁一点；
  - `InserOrder()` 还是需要注意当前/后驱节点是否为空，不能包含在 while 中的情况特殊判定；
  - `Reverse()` 中一个是需要另用一个指针记录前驱节点（即使使用递归似乎也需要这样，反正我是没想到了），另一个比较重要的是将 head->next 重新指向新的节点（也就是之前的尾节点），因为创建 List 类的时候偷懒没有加入 tail 成员，因此在这里用的是 static 静态变量来储存递归底部的节点。

Emmm......目前想到的就这些了。这次的代码综合性比较强一点，各方面都有涉及，后面可能还需要多复习一下。

