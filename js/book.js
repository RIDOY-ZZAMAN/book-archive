//-------------------------------Data loading part start---------------------------------
//Defining an arrow function named as "loadBook" with zero parameters
const loadBook = async () => {
    //Getting the input Field value by getElementById
    const inputField = document.getElementById('inputField');
    //Assinging the input Field value to searchText variable
    const searchText = inputField.value;
    //Checking the condition, if input field value is empty sting, then we will show emptySearchField Error message and hide bookContainer and totalResult message
    if (inputField.value === '') {
        document.getElementById('emptySearchField').style.display = "block";
        document.getElementById('bookContainer').style.display = "none";
        document.getElementById('totalResult').style.display = "none";
    }
    //If input value in not empty string them we will fetch the data form that url
    else {
        document.getElementById('emptySearchField').style.display = "none";
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        const totalresult = document.getElementById('totalResult');
        const totalSearchResult = document.createElement('p');
        totalresult.innerHTML = `
        Total ${data.numFound} Results Found!!!
        `
        totalresult.appendChild(totalSearchResult);
        //calling the displayBook function  with "data.docs" argument
        displayBook(data.docs);
        //Checking the conditon, if data.numFound===zero then we will show searchResultDidNotFind Error message
        if (data.numFound === 0) {
            document.getElementById('searchResultDidNotFind').style.display = "block";

        }
        //otherwise we will hide  the Error message
        else {
            document.getElementById('searchResultDidNotFind').style.display = "none"
        }
    }
    //clearig the input Field value;
    inputField.value = '';
}
//-------------------------------Data loading part end---------------------------------

//-------------------------------Data displaying part start---------------------------------
//Defining an arrow function named as "displayBook" with one parameter(books)
const displayBook = books => {
    //Getting the bookContainer section by getElementById
    const bookContainer = document.getElementById('bookContainer');
    //clearing the bookContainer
    bookContainer.textContent = '';
    //If we find  books data then we will do the below tasks
    books?.forEach(book => {

        //creating a div element to show the book details like book name,book publisher etc
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="col">
                <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'cover did not found'}-M.jpg" class="card-img-top" alt="image not found" height="250">
                   <div class="card-body">
                      <h4 class="card-title">Book Name: ${book.title}</h4>
                      <h6 class="card-title">Author: ${book.author_name ? book.author_name : "Author name missing"}</h6>
                      <h6 class="card-title">Publisher: ${book.publisher ? book.publisher : 'Publisher not found'}</h6>
                     <h6 class="card-title">First Publish year: ${book.first_publish_year ? book.first_publish_year : 'Did not find publish year'}</h6>     
                  </div>
               </div>
            </div>
        `
        //appending the newly created div element to bookContainer
        bookContainer.appendChild(div);
    })

}
//-------------------------------Data displaying part end---------------------------------