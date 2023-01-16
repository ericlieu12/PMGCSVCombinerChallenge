# PMGCSVCombinerChallenge
<h3> How To Setup: </h3>
Download. <br>
Make sure you have these installed: <br>
<ul>
<li>
Node
</li>
<li>
Git
</li>
</ul>

Run “npm install” on the terminal to get all node modules
<br>

<h3> How To Run: </h3>
<ol>
<li>
Make sure setup is done correctly </li>
<li> On the terminal, type: “node index.js (inputFiles relative path) > (outputFile relative path) <br>
  For example, to combine “accessories.csv” and “clothing.csv” into “output.csv”, the command would be “node index.js accessories.csv clothing.csv > output.csv” assuming that all of them are in the same directory
</li> <li>Done</li>

</ol>
<h3> Introduction:  </h3>
This is a solution for PMG’s Graduate Leadership Program’s technical assessment. <br>

The assessment is as follows: <br>
<li> Write a command line program that takes several CSV files as arguments. Each CSV file (found in the fixtures directory of this repo) will have the same columns. Your script should output a new CSV file to stdout that contains the rows from each of the inputs along with an additional column that has the filename from which the row came (only the file's basename, not the entire path). Use filename as the header for the additional column.
</li>
<br>

<b> NOTE: There was a conflict with one of the requirements. According to the instructions:<br>
<ol>
<li>Each CSV file (found in the fixtures directory of this repo) will have the same columns</li>
<li>It should also be able to handle more than two inputs, inputs with different columns, and very large (> 2GB) files gracefully.</li>
</ol>
Each CSV has the same columns but inputs can have different columns? For my solution, I am assuming that different columns for the files is a user <b> error </b> and will be processed as an error.
</b>
<h3> Initial Thoughts: </h3>
I wanted to provide a solution that closely resembles what I will be working on day to day at PMG. According to https://github.com/AgencyPMG/ProgrammingChallenges, the languages are as follows:
<ul>
<li>
PHP
</li>
<li>
Javascript (node, browser)
</li>
<li>
Python
</li>
<li>
Go
</li>
</ul>

Although I have experience with PHP, Javascript, and Python, I ended up choosing Javascript for the below reasons:
Most experience with it
Most knowledge of how to set it up (I did not know how to set up a CLI with JS but I knew that there was a way with Node)
PHP Setup would’ve been long since I only know how to use the Laravel framework
I have been coding in syntaxes that are more close to Javascript than Python lately
<br>
<h3>Setup:</h3>
After choosing Javascript, setup was by far the most tricky part. The completed solution would entail two parts:
<ol>
<li>
Unit testing
</li>
<li>
The actual solution
</li>
</ol>
I had virtually no idea how to set these two up to begin with but I knew that there would be resources online to teach me.

I had 4 steps in my mind to complete the setup.
<ol>
<li>
Setup Node
</li>
<li>
Setup reading files
</li>
<li>
Setup command line arguments
</li>
<li>
Setup unit testing
</li>
</ol>
<br>
Below were some of the tutorials I used to complete the setup. 
<br>
https://www.geeksforgeeks.org/how-do-you-run-javascript-script-through-the-terminal/
<br>

https://medium.com/@altshort/unit-testing-node-cli-apps-with-jest-2cd4adc599fb
<br>

When I had all these four setup, I knew I was ready to start the logic. 
https://github.com/ericlieu12/PMGCSVCombinerChallenge/commit/5b6f8e7271da91f5b45d92e6525d3c5e05ed96cc
<br>

This commit represents when I finished the setup.

<h3> Logic: </h3>
<img src="https://user-images.githubusercontent.com/38592426/212501396-32714962-3846-48a6-b9b0-2b1b363a972a.PNG">

<h4> Why? </h4>
Following the principles of good design, this seems like a good seperation of responsibility. Being placed into these modules will allow each module to be only focusing on their specific
part, making it simple and easy to maintain and read.

<h3> Considerations </h3>
On the official instructions, these were the considerations
<ol>
<li>
You should use coding best practices. Your code should be re-usable and extensible.
</li>
<li>
Your code should be testable by a CI/CD process.
</li>
<li>
Unit tests should be included.
</li>
</ol>
All three of these criteria were met. Code is documented and clean. 
<ol>
<li> With the modularity setup in the logic, the code is also re-usable and extensible. csvCombiner.js can be 
used server-side and connected to another client that is not main. index.js can include another csvCombiner.js tool that does something different. </li>
<li> Yes, the code can be tested in a CI/CD process effectively as it is organized properly and intuitively </li>
<li> Unit tests are included </li>
</ol>

<h3> Unit Tests </h3>
I derived these unit tests from these use cases:
<ol>
  <li> User calls the program but does not input any files </li>
  <li> User calls the program and inputs x .csv files with the same amount of columns and the same header values </li>
  <li> User calls the program and inputs x .csv files with the same amount of columns but different header values </li>
  <li> User calls the program and inputs x .csv files with different amount of columns and different header values </li>
  <li> User calls the program and inputs x files that are not .csv </li>
  <li> User calls the program and inputs x .csv files with the same amount of columns and the same header values but one of the lines is not formatted properly </li>
  </ol>
With these, I made 10 unit tests.
These 3 unit tests test the functionality of the solution.
<ol>
  <li> Formats Header Correctly </li>
  <li> Formats Line Correctly </li>
  <li> Checks writing to output file works correctly </li>
  </ol>
  <ol> 
  <li>
    Checks combine files for files with 2 columns
  </li>
  <li>
    Checks combine files for files with 3 columns
  </li>
  <li>
    Checks combine files where files have different columns
  </li>
  <li>
   checks combine file where files have same number of columns but different column names
  </li>
  <li>
    Improper file handled correctly
  </li>
  <li>
    No submission file handled correctly
  </li>
  </ol>
From the instructions, these are the assumptions:
<ol>
<li>
All column names are the same when using this program (i.e. all files have the same header content)
</li>
<li> ./fixtures/accessories.csv ./fixtures/clothing.csv > combined.csv This is the appropriate way to handle arguments. Arguments are assumed to be relative paths
</li>
<li> All files are CSV </li>
<li> All output files are CSV </li>
</ol>
With this, I came up with 7 unit tests that should encompass the entire function.
<ol>
<li>
Format header properly
</li>
<li>
Format line properly
</li>
<li>
Input file has lines that are correctly formatted
</li>
<li>
Writing to output file works
</li>
<li>
Combining files works
</li>
<li>
Improper files are captured and returned with an error
</li>
</ol>
I believe these 7 unit tests should cover atleast 99% of the requirements and code to this solution.

<h3> Struggles </h3>
By far, the most absolute struggle was that I created a 2GB file to test with and that would not be pushed to GIT. Git would not take that large of a file and I had to reset the commits to fix this. That is why there is a gap in the Git commit
history where 4 commits were squashed together into one.
<h3> Additional Test Cases </h3>
I created two three csv files to fit the requriements of the program:
<br> <b> It should also be able to handle more than two inputs, inputs with different columns, and very large (> 2GB) files gracefully. </b>

These files: <br>
<ol>
<li>
smallsample.csv has different column names than the ones provided with the problem (to test inputs with different columns)
</li>
<li>
smallsample2.csv has different column names than the ones provided with the problem (to test inputs with different columns) additionally
</li>
<li>
veryLargeFile.csv is 2.5GB and was handled gracefully (could not push to git due to size)
</li>
</ol>
<h3> Additional Considerations </h3>
By far, the most absolute struggle was that I created a 2GB file to test with and that would not be pushed to GIT. Git would not take that large of a file and I had to reset the commits to fix this. That is why there is a gap in the Git commit
history where 4 commits were squashed together into one.