"use server";
import { Podcasts } from "@/models/podcasts";
import { connectToDb } from "../database";

export const getPodcasts = async () => {
  console.log("fetching Podcasts");
  await connectToDb();
  try {
    const podcasts = await Podcasts.find({});

    const response = JSON.parse(JSON.stringify(podcasts));
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getEachPodcast = async (id) => {
  console.log("fetching this podcast");
  await connectToDb();
  try {
    const podcast = await Podcasts.findById(id);

    const response = JSON.parse(JSON.stringify(podcast));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const EditPodcast = async (podcastId, title, description, tag) => {
  console.log("Editing this podcast");
  await connectToDb();
  try {
    const podcast = await Podcasts.findByIdAndUpdate(podcastId, {
      title,
      description,
      tag,
    });

    return { message: "Podcast has Edited", status: 201 };
  } catch (error) {
    console.log(error);
  }
};

export const DeletePodcast = async (id) => {
  console.log("Deleting this podcast");
  await connectToDb();
  try {
    const podcast = await Podcasts.findByIdAndDelete(id);

    const response = JSON.parse(JSON.stringify(podcast));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createPodcast = async (title, description, tag) => {
  try {
    await connectToDb();
    await Podcasts.create({
      title,
      description,
      tag,
    });

    return { message: "Podcast has been Created", status: 201 };
  } catch (error) {
    console.log(error);
  }
};
