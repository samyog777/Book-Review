import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { Firestore, getFirestore, query, collection, onSnapshot, orderBy, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCHyoy06JwOA4EenudqA2a9KtuyYl4_fQ",
    authDomain: "samyog-cloud-project.firebaseapp.com",
    projectId: "samyog-cloud-project",
    storageBucket: "samyog-cloud-project.appspot.com",
    messagingSenderId: "808326962925",
    appId: "1:808326962925:web:54246755a6b712d29ab6e4",
    measurementId: "G-G2Z9EED18G"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get a live data snapshot (i.e. auto-refresh) of our Reviews collection
const q = query(collection(db, "Book-Review"), orderBy("Title"));
const unsubscribe = onSnapshot(q, (snapshot) => {
    // Empty HTML table
    $('#reviewList').empty();
    // Loop through snapshot data and add to HTML table
    var tableRows = '';
    snapshot.forEach((doc) => {
        tableRows += '<tr>';
        tableRows += '<td>' + doc.data().title + '</td>';
        tableRows += '<td>' + doc.data().author + '/5</td>';
        tableRows += '</tr>';
    });
    $('#reviewList').append(tableRows);
    // Display review count
    $('#mainTitle').html(snapshot.size + " book reviews in the list");
    // Add button pressed
    $("#addButton").click(function () {// Add review to Firestore collection
        const docRef = addDoc(collection(db, "Book-Review"), {
            title: $("#bookName").val(),
            author: parseInt($("#bookRating").val())
        });
        // Reset form
        $("#bookName").val('');
        $("#bookRating").val('1');
    });
});

