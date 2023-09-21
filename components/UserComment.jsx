import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { PersonCircle, StarFill } from 'react-bootstrap-icons';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/router';
import { createRating } from '@/services/products';
import { ToastContainer, toast } from 'react-toastify';


const UserComment = (props) => {
    const { data } = props
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(4);
    const [userData,setUserData] = useState()
    const router = useRouter();
    const currentRoute = router.asPath.split('/')[3];

    const changeRating = (newRating) => {
        setRating(newRating);
    };
    const handleAddComment = () => {
        const data = {
            "user": userData._id, 
            "product": currentRoute,
            "rating": rating,
            "reviewText": newComment
          }

      createRating(data).then((res)=>{
        if(res.status === 201){
            setRating(4)
            setNewComment('')
            props.commentCall()
            toast.success("Comment has been added", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
      }).catch(err=>console.log(err))    
     
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
          const storedUserData = localStorage.getItem('userinfo');
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        }
      }, []); 
    return (
        <div>
          
                    <>
                       {
                        data &&  <Card className="mb-3 p-4">
                        {
                            data.map((e) => (
                                <div className="mb-3" style={{ borderBottom: "1px solid grey" }}>
                                    <div className="d-flex align-items-center mb-2" style={{ display: "flex" }}>
                                        <PersonCircle className="mr-2" size={24} />
                                        <p style={{ paddingLeft: "1rem" }}>{e.user.name}</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-2" style={{ display: "flex" }}>
                                        {Array.from({ length: e.rating }).map((_, i) => (
                                            <StarFill key={i} className="text-warning mr-2" size={20} />
                                        ))}
                                    </div>
                                    <p style={{ paddingBottom: "1rem" }}>{e.reviewText}</p>
                                </div>
                            ))
                        }
                    </Card>
                       }
                        <Card className="mb-3 p-4">
                            <Card.Title>Add Your Review</Card.Title>
                            <Form.Group controlId="commentText">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Write your comment here..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </Form.Group>
                            <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="blue"
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                    className="small-stars"
                                    starDimension="2rem" 
                                />
                            </div>
                            <Button onClick={handleAddComment} className="mt-3">
                                Add Review
                            </Button>
                        </Card>
                        <ToastContainer/>
                    </>
            
        </div>
    );
};

export default UserComment;
