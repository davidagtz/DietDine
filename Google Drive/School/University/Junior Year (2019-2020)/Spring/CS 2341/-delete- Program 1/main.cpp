#define CATCH_CONFIG_RUNNER
#include "catch.hpp"
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <functional>
#include <sstream>
#include <map>
#include <set>
#include "DSstring.h"
using namespace std;

void runTests();
vector<int> getTrainingTarget();
map<string, int> trainWithData(const vector<int> &tweetRatings);
vector<int> getTestingTarget();
void testWithData(const map<string, int> &wordRatings, const vector<int> tweetRatings);
void eraseAllSubStr(string &mainStr, const string &toErase);
void eraseSubStrings(string &mainStr, const vector<string> &strList);

int main(int argc, char **argv)
{
    if (argc == 1)
    {
        runTests();
        return 0;
    }
    else {
        testWithData(trainWithData(getTrainingTarget()), getTestingTarget());
        return 0;
    }
}

void runTests(){
    Catch::Session().run();
}

//  TRAINING: STORE RATINGS OF TWEETS
vector<int> getTrainingTarget()
{
    ifstream inputFile("PA01Files/dev-train-target-sm.csv");
    if (!inputFile)
        cout << "File cannot be opened" << endl;
    else if (inputFile.is_open())
    {
        int counter = 0;
        string tweetRating;
        vector<int> tweetRatings;
        getline(inputFile, tweetRating);
        while (getline(inputFile, tweetRating, ','))
        {
            getline(inputFile, tweetRating, ',');
            tweetRatings.push_back(stoi(tweetRating));
            getline(inputFile, tweetRating);
             if (++counter == 16000)
                 break;
        }

        inputFile.close();
        return tweetRatings;
    }

    return vector<int>{};
}

// ****  TRAINING -- STORE TWEETS ****
map<string, int> trainWithData(const vector<int> &tweetRatings)
{

    ifstream inputFile("PA01Files/dev-train-data-sm.csv");
    if (!inputFile)
        cout << "File cannot be opened" << endl;
    else if (inputFile.is_open())
    {
        int counter = 0;
        string tweet;
        string currentWord;
        map<string, int> wordRatings;
        int rowNum = 0;
        getline(inputFile, tweet);
        while (getline(inputFile, tweet, ','))
        {
            getline(inputFile, tweet, ',');
            getline(inputFile, tweet, ',');
            getline(inputFile, tweet);

            for (int i = 0, len = tweet.size(); i < len; i++)
            {
                if (ispunct(tweet[i]))
                {
                    tweet.erase(i--, 1);
                    len = tweet.size();
                }
            }

            // remove english articles
            eraseSubStrings(tweet, {"a", "an", "the"});

            stringstream ss(tweet);
            while (getline(ss, currentWord, ' '))
            {
                int positivityAddition = (tweetRatings.at(rowNum) == 0) ? -1 : 1;
                if (!wordRatings.insert(make_pair(currentWord, positivityAddition)).second)
                {
                    //  element is already present
                    wordRatings[currentWord] = wordRatings[currentWord] += positivityAddition;
                }
            }
            rowNum++;
             if (++counter == 16000)
                 break;
        }

        wordRatings.erase("");
        inputFile.close();

        return wordRatings;
    }
    return map<string, int>{};
}

//  TESTING: STORE RATINGS OF TWEETS
vector<int> getTestingTarget()
{
    ifstream inputFile("PA01Files/dev-test-target.csv");
    if (!inputFile)
        cout << "File cannot be opened" << endl;
    else if (inputFile.is_open())
    {
        int counter = 0;
        string tweetRating;
        vector<int> tweetRatings;
        getline(inputFile, tweetRating);
        while (getline(inputFile, tweetRating, ','))
        {
            getline(inputFile, tweetRating, ',');
            tweetRatings.push_back(stoi(tweetRating));
            getline(inputFile, tweetRating);
             if (++counter == 1000)
                 break;
        }

        inputFile.close();
        return tweetRatings;
    }

    return vector<int>{};
}

//  TESTING: STORE TWEETS
void testWithData(const map<string, int> &wordRatings, const vector<int> tweetRatings)
{
    ifstream inputFile("PA01Files/dev-test-data.csv");
    if (!inputFile)
        cout << "File cannot be opened" << endl;
    else if (inputFile.is_open())
    {
        int counter = 0;
        int totalTweets = 0;
        string tweet = "";
        set<string> wordSet;
        string currentWord = "";
        int rowNum = 0;
        int tweetsCorrect = 0;
        string tweetID = "";
        map<string, int> tweetIDs;
        getline(inputFile, tweet);
        while (getline(inputFile, tweet, ','))
        {
            totalTweets++;
            getline(inputFile, tweetID, ',');
            getline(inputFile, tweet, ',');
            getline(inputFile, tweet);
            tweetIDs.insert(make_pair(tweetID, 0));

            int tweetScore = 0;
            if (tweet.find("(") != string::npos ||
                tweet.find("!") != string::npos ||
                tweet.find("&") != string::npos ||
                tweet.find("LOL") != string::npos ||
                tweet.find("lmao") != string::npos ||
                tweet.find("LMAO") != string::npos)
            {
                tweetScore += 30000;
            }
            if (tweet.find("...") != string::npos)
            {
                tweetScore -= 3000;
            }

            for (int i = 0, len = tweet.size(); i < len; i++)
            {
                if (ispunct(tweet[i]))
                {
                    tweet.erase(i--, 1);
                    len = tweet.size();
                }
            }

            //  remove english articles
            eraseSubStrings(tweet, {"a", "an", "the"});

            stringstream ss(tweet);
            wordSet.clear();
            while (getline(ss, currentWord, ' '))
            {
                bool allCaps = true;
                for (auto c : currentWord)
                {
                    if (!isupper(c))
                    {
                        allCaps = false;
                        break;
                    }
                }
                if (allCaps)
                {
                    tweetScore += 2850;
                }
                wordSet.insert(currentWord);
            }

            wordSet.erase("");
            for (auto elem : wordSet)
            {
                auto itr = wordRatings.find(elem);
                if (itr != wordRatings.end())
                {
                    tweetScore += itr->second;
                }
            }

            int tweetPositivity = (tweetScore >= 0) ? 4 : 0;
            if (tweetPositivity == tweetRatings.at(rowNum))
            {
                tweetsCorrect++;
                tweetIDs[tweetID] = 1;
            }
            rowNum++;
             if (++counter == 1000)
                 break;
        }

        ofstream outFile("output.txt");
        if (!outFile)
        {
            cout << "File not opened" << endl;
        }
        else
        {
            outFile << "Accuracy: " << static_cast<double>(tweetsCorrect) / totalTweets << endl;
            for (auto elem : tweetIDs)
            {
                if (elem.second == 0)
                {
                    outFile << elem.first << endl;
                }
            }

            outFile.close();
        }

        inputFile.close();
    }
}

//  Erase all occurrences of a given substring from a string
void eraseAllSubStr(string &mainStr, const string &toErase)
{
    size_t pos = string::npos;

    //  search for the substring in string in a loop until nothing is found
    while ((pos = mainStr.find(toErase)) != string::npos)
    {
        // if found, then erase it from string
        mainStr.erase(pos, toErase.length());
    }
}

//  Erase all occurrences of all given substrings from main string
void eraseSubStrings(string &mainStr, const vector<string> &strList)
{
    //  iterate over the given list of substrings
    //  for each substring call eraseAllSubStr() to remove all occurrences from main string
    for_each(strList.begin(), strList.end(), bind(eraseAllSubStr, ref(mainStr), placeholders::_1));
}