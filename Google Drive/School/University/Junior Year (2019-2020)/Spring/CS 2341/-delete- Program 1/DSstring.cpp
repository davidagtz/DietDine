#include "DSstring.h"

DSstring::DSstring()
{
    DSstr = new char;
}

DSstring::DSstring(const char *str)
{
    DSstr = new char[strlen(str) + 1];
    strcpy(DSstr, str);
}

DSstring::~DSstring()
{
    delete DSstr;
}

DSstring &DSstring::operator=(const DSstring &rhs)
{
    if (this == &rhs)
        return *this;
    DSstr = rhs.DSstr;
    return *this;
}

char &DSstring::operator[](int i)
{
    if (i > strlen(DSstr))
    {
        cout << "Index out of bounds" << endl;

        //  return first element
        return DSstr[0];
    }

    return DSstr[i];
}

char *DSstring::getDSstr()
{
    return DSstr;
}

int DSstring::getSize()
{
    return strlen(DSstr) + 1;
}

char *DSstring::substr(int pos, int len)
{
    char *temp = new char[len + 1];
    for (int i = pos; i < len; i++)
    {
        temp[i - pos] = DSstr[i];
    }
    return temp;
}

void DSstring::erase(int pos, int len)
{
    char *substr1 = substr(0, pos);
    char *substr2 = substr(pos + len, getSize());
    DSstr = strcat(substr1, substr2);

    delete substr1;
    delete substr2;
}