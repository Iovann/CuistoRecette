import React, { useEffect, useState } from 'react'
import Blog_card from './blog_card'

const Blog_row = () => {
    const [art, setArt] = useState([]);

    useEffect(() => {
        const data = [
            { image: '/assets/images/blog_1.jpg', title: "Les Bienfaits d'une Alimentation Saine", subtitle: "Nourrir votre santé physique et mentale à travers des choix alimentaires éclairés", content: "Adopter une alimentation saine est essentiel pour maintenir un corps et un esprit en bonne santé. Les aliments riches en nutriments, tels que les fruits, les légumes, les grains entiers et les protéines maigres, fournissent l'énergie nécessaire pour soutenir les fonctions corporelles et prévenir les maladies. Une alimentation équilibrée aide à maintenir un poids optimal, améliore la digestion et renforce le système immunitaire." },
            { image: '/assets/images/blog_5.avif', title: 'Les fruits : des antioxydants pour une peau radieuse', subtitle: "Comment les antioxydants des fruits améliorent la santé de la peau.", content:"Les fruits comme les oranges, les fraises et les kiwis sont riches en antioxydants, qui aident à neutraliser les radicaux libres responsables du vieillissement prématuré de la peau. Ces nutriments favorisent une peau plus ferme, éclatante et hydratée, tout en réduisant l'apparence des rides et des imperfections. Intégrez ces fruits colorés à votre régime alimentaire pour une peau saine et lumineuse de l'intérieur."},
            { image: '/assets/images/blog_3.jpg', title: "L'Importance des Fruits dans une Alimentation Équilibrée", subtitle: "Pourquoi les fruits sont essentiels pour une santé optimale.", content: "Les fruits sont une source naturelle de vitamines, minéraux, fibres et antioxydants nécessaires au bon fonctionnement du corps. Leur consommation régulière aide à renforcer le système immunitaire, à maintenir un poids santé et à réduire le risque de maladies chroniques telles que les maladies cardiaques et le diabète de type 2. Découvrez comment intégrer les fruits dans votre alimentation quotidienne peut avoir un impact positif sur votre bien-être global." },
        ];
        setArt(data.slice(0, 2));
    }, []);
    return (
        <div className="container">
            <div className="row gx-4">
                {art.map((item, index) => (
                    <div key={index} className="col-lg-6">
                        <Blog_card image={item.image} title={item.title} subtitle={item.subtitle} content={item.content} />
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Blog_row
