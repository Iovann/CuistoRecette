import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { IoMdMore } from "react-icons/io";
import { Rating } from 'primereact/rating';
import { doc, collection, query, where, getDocs, deleteDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseApp from '../firebaseConfig';
import Star from './star';

const Commentaire = ({ photo, fullname, text, rating, date, commentId, id, userId }) => {
    let commentAuthor = false
    const auth = getAuth(firebaseApp);
    const [value, setValue] = useState(0)
    const [updateComment, setUpdateComment] = useState('')
    const db = getFirestore(firebaseApp);
    const handleDelete = async (commentId, id) => {
        try {
            const commentRef = doc(db, "rating", commentId);

            await deleteDoc(commentRef);

            const q = query(collection(db, "rating"), where("recipeId", "==", id));
            const querySnapshot = await getDocs(q);

            let totalRating = 0;
            let ratingCount = 0;

            querySnapshot.forEach((doc) => {
                totalRating += doc.data().rating;
                ratingCount++;
            });

            const newAverageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

            const recipeRef = doc(db, "recipes", id);
            await updateDoc(recipeRef, {
                rating: newAverageRating
            });

            alert("Votre commentaire a été supprimé avec succès !");
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("Une erreur est survenue lors de la suppression de votre commentaire. Veuillez réessayer.");
        }
    };
    const handleUpdate = async (commentId, updatedComment, updatedRating) => {
        try {
            // Référence au document du commentaire à mettre à jour
            const commentRef = doc(db, "rating", commentId);

            // Mise à jour du commentaire
            await updateDoc(commentRef, {
                comment: updatedComment,
                rating: updatedRating,
                date: new Date()  // Met à jour la date si nécessaire
            });

            // Recalculer la note moyenne
            const q = query(collection(db, "rating"), where("recipeId", "==", id));
            const querySnapshot = await getDocs(q);

            let totalRating = 0;
            let ratingCount = 0;

            querySnapshot.forEach((doc) => {
                totalRating += doc.data().rating;
                ratingCount++;
            });

            const newAverageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

            // Mise à jour de la note moyenne de la recette
            const recipeRef = doc(db, "recipes", id);
            await updateDoc(recipeRef, {
                rating: newAverageRating
            });

            alert("Votre commentaire a été mis à jour avec succès !");
        } catch (error) {
            console.error("Error updating comment:", error);
            alert("Une erreur est survenue lors de la mise à jour de votre commentaire. Veuillez réessayer.");
        }
    };

    const handleChangeComment = (e) => { setUpdateComment(e.target.value) }
    if (auth.currentUser.uid === userId) { commentAuthor = true }
    return (
        <div>
            <div className="row py-2">
                <div className="col-lg-8">
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className='d-flex align-items-center py-2'>
                            {photo && <span className='mb-0 me-sm-2'><img src={photo} className='rounded-circle avatar img-fluid' alt="" /></span>}
                            {!photo && <span className='mb-0 me-sm-2'><BsPersonCircle size={50} color='#B55D51' className='avatar' /></span>}
                            <span className='fw-bold fs-5'>{fullname}</span>
                        </div>
                        {
                            commentAuthor
                            &&
                            <div className="text-end dropdown-center">
                                <IoMdMore size={30} className='dropdown-toogle' role="button" data-bs-toggle="dropdown" aria-expanded="false" />

                                <ul className="dropdown-menu">
                                    <li><span className="dropdown-item fw-semibold" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Modifier</span></li>
                                    <li><span className="dropdown-item fw-semibold" onClick={() => handleDelete(commentId, id)}>Supprimer</span></li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className='d-flex align-items-center'>
                        <Star count={rating} />
                        {date && <span className='px-4 fw-semibold'>{date}</span>}
                        {!date && <span className='px-4 fw-semibold'>17/02/23</span>}
                    </div>
                    <p className="fw-semibold py-2">{text}</p>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">modifier mon commentaire</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='text-start'><Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} /></div>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Commentaire:</label>
                                    <textarea className="form-control" id="message-text" value={updateComment} onChange={handleChangeComment}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="button" className="btn bg-brown" onClick={() => handleUpdate(commentId, updateComment, value)}>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commentaire
