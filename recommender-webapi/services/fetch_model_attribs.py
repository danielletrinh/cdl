# services/fetch_model_attribs.py
import json
import numpy as np
from fastai.tabular.all import *
from fastai.collab import *
import os
import pandas as pd

def get_embeddings_as_json(n_items=None, n_users=None):
    try:

        current_directory = os.getcwd()
        
        books = pd.read_csv(current_directory + '\\static\\datasources\\Books.csv', low_memory=False)
        ratings = pd.read_csv(current_directory + '\\static\\datasources\\Ratings.csv', low_memory=False)
        users = pd.read_csv(current_directory + '\\static\\datasources\\Users.csv', low_memory=False)
        
        books_with_ratings = ratings.merge(books, on='ISBN')
        
        num_ratings = books_with_ratings.groupby('Book-Title')['Book-Rating'].count().reset_index()
        num_ratings.rename(columns={'Book-Rating':'Num-Ratings'}, inplace=True)
        
        avg_ratings = books_with_ratings.groupby('Book-Title')['Book-Rating'].mean().reset_index()
        avg_ratings.rename(columns={'Book-Rating':'Avg-Rating'}, inplace=True)
        
        dls = CollabDataLoaders.from_df(books_with_ratings, user_name='User-ID', item_name='Book-Title', rating_name='Book-Rating', bs=64)
        learner = collab_learner(dls, n_factors=50, y_range=(0, 10.5))
        learner = learner.load(current_directory + '\\static\\models\\books-model-bsolovij-test')
        """
        Get JSON representations of user and item embeddings from a collaborative filtering model.

        Parameters:
        - learner: The fastai Learner object with a trained collaborative filtering model.
        - n_items: Number of item embeddings to include in the output (optional, default is None).
        - n_users: Number of user embeddings to include in the output (optional, default is None).

        Returns:
        - A dictionary containing JSON representations of user and item embeddings.
        """
        # Ensure the model is in evaluation mode
        learner.model.eval()
        
        # Get user and item embeddings
        user_embeddings = learner.model.u_weight.weight.detach().numpy()
        item_embeddings = learner.model.i_weight.weight.detach().numpy()

        # Limit the number of embeddings if specified
        if n_users is not None:
            user_embeddings = user_embeddings[:n_users]
        if n_items is not None:
            item_embeddings = item_embeddings[:n_items]

        # Convert embeddings to JSON format
        user_json = [{'user_id': i, 'embedding': user.tolist()} for i, user in enumerate(user_embeddings)]
        item_json = [{'item_id': i, 'embedding': item.tolist()} for i, item in enumerate(item_embeddings)]

        # Return the result as a dictionary
        result = {'user_embeddings': user_json, 'item_embeddings': item_json}
        return result
    except Exception as e:
        return { "error": str(e) }
