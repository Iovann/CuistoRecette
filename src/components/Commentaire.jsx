import React from 'react'

const Commentaire = () => {
    return (
        <div>
            <hr />
            <div className="row py-2">
                <div className="col-lg-8">
                    <div className='d-flex align-items-center'>
                        <span className='mb-0 me-sm-2'><img src="/public/assets/icons/avatar.jpg" className='rounded-circle avatar img-fluid' alt="" /></span>
                        <span className='fw-bold fs-5'>Tricia Albert</span>
                    </div>
                    <p className="fw-semibold mt-2">
                        J'ai réalisé cette recette de spaghetti à la bolognaise pour la première fois ce soir, et je suis absolument ravi(e) du résultat ! C'était un vrai délice, et toute ma famille a adoré.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Commentaire
