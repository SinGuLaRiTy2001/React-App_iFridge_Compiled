---
layout: post
title: 'Linked List 链表'
date: 2020-04-21
author: Wen Jian
cover: ''
tags: C++ Pointer
---

> 通过链表进一步熟悉指针

### Problem

#### Content

编写单链表操作程序。

#### Requirement

- 结点类型：`struct node { int num; node *next; };`
- 函数：
   - `node *create()`
    功能：建立带表头结点的无序链表，head指向链首，随机产生若干个二位数的整数，依次加入该无序链表的尾部，在产生随机数99并加入后，就停止随机数的产生，最后返回该无序链表的首指针。分别采用向前生成链表，向后生成链表算法建立。
   - `void print(node *head)`
    功能：输出head所指向的链表中各结点成员num的值。
   - `void free(node *head)`
    功能：释放head所指向的链表中各结点空间。
   - `node *sort(node *head)`
    功能：对head所指向的无序链表进行排序，使链表上的各个结点，按成员num的值升序排序，并返回排好序的链表的首指针。算法提示：先让指针p指向空链，然后依次从head所指向的链表中摘下一个结点，将摘下的结点有序插入到已排序的h所指向的链表中，最后返回排好序的链表的首指针p。

#### Code

``` c++
#include<iostream>
#include<cstdio>
#include<ctime>

using namespace std;

struct node
{
    int num;
    node *next;
};

node *create_backward()
{
    //create an empty linked list
    node *head=new node;
    head->next=NULL;

    //create and add new nodes backward
    int temp;
    node *p=head,*new_node;
    srand(time(NULL));
    do
    {
        temp=rand()%90+10;
        new_node=new node;
        new_node->num=temp;
        new_node->next=NULL;
        p->next=new_node;
        p=new_node;
    } while (temp!=99);
    return head;
}

node *create_forward()
{
    //create an empty linked list
    node *head=new node;
    head->next=NULL;

    //create and add new nodes forward
    int temp;
    node *p=head->next,*new_node;
    srand(time(NULL));
    do
    {
        temp=rand()%90+10;
        new_node=new node;
        new_node->num=temp;
        new_node->next=p;
        head->next=new_node;
        p=new_node;
    } while (temp!=99);
    return head;
}

void print(node *head)
{
    node *p=head;
    while(p->next)
    {
        p=p->next;
        cout<<p->num<<' ';
    }
}

//free the memory through recursion
void free(node *head)
{
    node *p=head;
    if(p->next)
        free(p->next);
    else
    {
        delete p;
        return ;
    }
    delete p;
}

//Add node p after node new_p
void insert(node *p,node *new_p)
{
    node *temp;
    temp=new node;
    temp->num=p->num;
    temp->next=new_p->next; 
    new_p->next=temp;
}

node *sort(node *head)
{
    node *new_head=new node;
    node *new_p;
    new_head->next=NULL;
    
    node *p=head,*p_post;
    while(p->next)
    {
        p_post=p;
        p=p->next;
        delete p_post;//the post node is no longer useful
        new_p=new_head;

        //special judge: when node p is smaller than the first node in new linked list
        if(new_p->next&&p->num<new_p->next->num)
        {
            insert(p,new_p);
            continue;
        }

        //other situation
        while(new_p->next)
        {
            new_p=new_p->next;
            if(p->num>=new_p->num&&(!new_p->next||p->num<=new_p->next->num))
                break;
        }
        //Add node p after node new_p
        insert(p,new_p);
    }
    return new_head;
}

int main()
{
    node *head_a=create_backward();
    node *head_b=create_forward();

    cout<<"Linked list a: "<<endl; print(head_a); cout<<endl;
    cout<<"Linked list b: "<<endl; print(head_b); cout<<endl;

    head_a=sort(head_a);
    head_b=sort(head_b);

    cout<<"Linked list a: "<<endl; print(head_a); cout<<endl;
    cout<<"Linked list b: "<<endl; print(head_b); cout<<endl;

    free(head_a);
    free(head_b);

    system("pause");
    return 0;
}
```

#### Summary

链表这个东西嘛，以前还是接触过的，但是具体实现还是记不清了。。。所以这次差不多也是重新学起吧~

如果理解了链表的基础概念，那么create()、print()、free()函数还是比较好写的，这几个函数就大致过一下：

- create()：代码中要求使用前插法和后插法两种方法，个人觉得后插法还是比较简单的，直接将最后一个节点的 next 赋值为 new node 就可以了；而前插法，由于这是一个**带表头结点的链表，在表头有一个额外的 node 节点作为 head ，其本身并不存储数据，单纯地作为表头指向下一个节点**，这就意味着新的节点需要插入在 head 与 head->next 之间：
  
  before: `[head] -> [node1] -> [node2]...`

  after: `[head] -> [new node] -> [node1] -> [node2]...`

  我们可以看出，此处添加节点可分为两步：① `new_node->next=node1` ② `head->next=new_node`
- print(): 这个就真的没什么好说的了：用p指针从head节点一直往后遍历，直到 `p.next==NULL` ，说明已经到达链表的尾部，结束遍历即可。
- free(): 在释放链表的内存空间时，需要注意，对于单链表，**先从尾部开始释放，头部最后释放**，因为单链表中每个节点仅保存了后驱节点的地址，如果先释放前面的节点，那么后面的节点就丢失了。当然你也可以通过临时存储后驱节点来达到从前往后 delete 的目的，只不过我还是觉得太复杂了~ 我的方法呢，就是**利用递归**，先通过递归到达链表的尾部，再逐级返回，返回的时候完成内存释放操作。

上面这些代码都是下午在讲座的时候完成的（qwq），剩下的 sort() 函数就稍微要复杂些了。最开始，我尝试着利用数组排序的方式进行操作，但是由于链表的节点不能直接访问，而且节点的交换、删除等操作比较复杂，因此还是采用 Requirement 中的方法，即新构造一个链表，将节点逐个从原表中取出，再按类似插入排序的模式插入进新链表中。

- sort(): 函数的主体采用的是两个 while 循环嵌套，外层循环用 p 指针遍历旧的链表，逐个将其“取出”；内层循环用 new_p 指针遍历新的链表，通过将 p 指针所在节点的 num 与 new_p 及它的后驱节点的 num 进行比较，从而确定插入的位置，最后进行插入操作。当然，你如果看了上面的代码就会发现，在细节实现方面还是有些东西的：
    - 内层循环的条件判断—— `if(p->num>=new_p->num&&(!new_p->next||p->num<=new_p->next->num))` 这里的 `!new_p->next` **必须放在“或（\|\|）”之前**，否则当 `new_p->next==NULL` 时，再访问 `new_p->next->num` 会发生**访问出界**。在维护链表时，要时刻注意类似的问题，有时甚至需要思考 `node->next->next` 是否为 NULL 。
    - 在内层 while 循环之前的 if 特判—— 如果没有这个特判的话，那么在单步调试的时候你就会发现，程序**无法将节点插入到第一个节点的位置（即 head 之后）**。为什么呢？因为在内层循环中，我们相当于跳过了 head 这一节点（因为 head 本身不存储数据） 。当新插入的节点比第一个节点小时，它本来应该被放在 head 之后，如果直接进入内层 while 循环，就会被放在错误的位置。因此需要在内层 while 循环之前加一条特判，特殊处理这种情况。
    - insert()函数中的temp—— 在初版本的代码中，我是直接通过指针操作，对两个链表的节点进行操作，包括 p 指针、 new_p 指针的前驱、后驱节点，但是却发现这样做的本质其实是浅复制，而且会使得 p 指针所在节点的后驱丢失，导致外层 while 循环出错。于是我就想到构建 temp 临时节点来储存 p 指针包含的数据，再将其插入到新链表中。这样一来， p 指针指向的空间也就可以被回收了。为了做到保留 p 指针的后驱，同时释放 p 指针占用的内存，我通过 post_p 储存 p 指针的前驱，这样就可以使得我们能够在 p 指针完成转移后 释放之前占用的空间。

呼~ 终于码完了，本来还想着回顾一下课堂上的知识点，但是现在已经不早了，而且我觉得写了那么多总结，似乎知识点也复习的差不多了哈哈哈！好吧，就先这样吧，晚安咯！
