#ifndef DSSTRING_H
#define DSSTRING_H
#include <string.h>
#include <iostream>
using namespace std;

class DSstring
{
private:
    char *DSstr;

public:
    
    DSstring();
    DSstring(const char *str);
    ~DSstring();
    DSstring &operator=(const DSstring &rhs);
    friend ostream &operator<<(ostream &os, const DSstring &dss);
    friend bool operator<(const DSstring &dss1, const DSstring &dss2);
    char &operator[](int i);
    char *getDSstr();
    int getSize();
    char *substr(int pos, int len);
    void erase(int pos, int len);

    friend ostream &operator<<(ostream &os, const DSstring &dss)
    {
        os << dss.DSstr;
        return os;
    }

    friend bool operator<(const DSstring &dss1, const DSstring &dss2)
    {
        return (strcmp(dss1.DSstr, dss2.DSstr) < 0);
    }
};

#endif