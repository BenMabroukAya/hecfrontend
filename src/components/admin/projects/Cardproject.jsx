import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
const Cardproject = ({project}) => {
return (
<div className="container">
<div className="row">



<div className="col-md-6 offset-md-3 border rounded p-4 mt-4

shadow">

<h2 className="text-center m-4">Détails Project</h2>
<Card sx={{ maxWidth: 'auto',margin: 1 }}>
<Card.Img variant="top" src={project.photo} width={100}
height={200}/>
<Card.Body>
<Card.Title><b>title : </b>{project.title}</Card.Title>
<Card.Text>
{project.description}
</Card.Text>
<Card.Text>
<b>Prix: {project.status} DT</b>
</Card.Text>
<Link className="btn btn-primary my-2" to={"/projects"}>
Retour
</Link>
</Card.Body>
</Card>

</div>
</div>
</div>
)
}
export default Cardproject;