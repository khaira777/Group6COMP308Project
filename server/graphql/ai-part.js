import { gql } from "apollo-server-express";
import tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node";
import { chart } from "./heart.js";

export const Prediction = gql`
  type Mutation {
    addPrediction(
      Age: Float!
      RestingBP: Float!
      Cholesterol: Float!
      FastingBS: Float!
      MaxHR: Float!
      Oldpeak: Float!
    ): Prediction
  }

  type Prediction {
    value: Float!
  }
`;

export const predictionResolvers = {
  Mutation: {
    addPrediction: async (parent, args, ctx, info) => {
      const Age = args.Age;
      const RestingBP = args.RestingBP;
      const FastingBS = args.FastingBS;
      const Cholesterol = args.Cholesterol;
      const MaxHR = args.MaxHR;
      const Oldpeak = args.Oldpeak;

      var okay = 299;

      const testing = [
        { Age, RestingBP, Cholesterol, FastingBS, MaxHR, Oldpeak },
      ];
      console.log(testing);

      // convert/setup our data for tensorflow.js
      // tensor of features for training data
      // include only features, not the output
      const trainingData = tf.tensor2d(
        chart.map((item) => [
          parseInt(item.Age),
          parseInt(item.RestingBP),
          parseInt(item.Cholesterol),
          parseInt(item.FastingBS),
          parseInt(item.MaxHR),
          parseInt(item.Oldpeak),
        ])
      );

      //tensor of output for training data
      const outputData = tf.tensor2d(
        chart.map((item) => [
          parseInt(item.HeartDisease) === 1 ? 1 : 0,
          //item.HeartDisease === 0 ? 0 : 1,
        ])
      );

      //tensor of features for testing data
      const testingData = tf.tensor2d(
        testing.map((item) => [
          item.Age,
          item.RestingBP,
          item.Cholesterol,
          item.FastingBS,
          item.MaxHR,
          item.Oldpeak,
        ])
      );

      // build neural network using a sequential model
      const model = tf.sequential();

      //add the first layer
      model.add(
        tf.layers.dense({
          inputShape: [6], // four input neurons
          activation: "sigmoid",
          units: 8, //dimension of output space (first hidden layer)
        })
      );

      //add the hidden layer
      model.add(
        tf.layers.dense({
          inputShape: [8], //dimension of hidden layer
          activation: "sigmoid",
          units: 1, //dimension of final output (setosa, virginica, versicolor)
        })
      );
      //add output layer
      model.add(
        tf.layers.dense({
          activation: "sigmoid",
          units: 1, //dimension of final output (setosa, virginica, versicolor)
        })
      );
      //compile the model with an MSE loss function and Adam algorithm
      model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(0.0008),
      });
      console.log(model.summary());

      let predictionResult = [];

      //Train the model and predict the results for testing data
      // train/fit the model for the fixed number of epochs
      const startTime = Date.now();
      //train the model
      await model.fit(trainingData, outputData, {
        epochs: 100,
        callbacks: {
          //list of callbacks to be called during training
          onEpochEnd: async (epoch, log) => {
            //lossValue = log.loss;
            console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
            var elapsedTime = Date.now() - startTime;
            console.log("elapsed time: " + elapsedTime);
          },
        },
      });

      const results = model.predict(testingData);
      var finalResults = results;
      var valuePrediction = 0;

      // get the values from the tf.Tensor
      await results.array().then((array) => {
        console.log(array[0][0]);
        var resultForData1 = array[0];
        var dataToSent = {
          row1: resultForData1,
        };
        console.log(resultForData1);
        valuePrediction = resultForData1;
        okay = resultForData1;
      });
      return { value: okay[0].toFixed(2) };
    },
  },
};
